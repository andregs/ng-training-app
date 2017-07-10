import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private service: LoginService,
  ) {
    // empty
  }

  canActivate() {
    return this.service.getProfile()
      .map(user => {
        if (user && user.admin) {
          console.log('Ok, user is authorized.');
          return true;
        } else {
          console.log('You shall not pass!');
          this.service.logout().subscribe(
            () => this.router.navigate(['/login']),
          );
          return false;
        }
      });
  }

}
