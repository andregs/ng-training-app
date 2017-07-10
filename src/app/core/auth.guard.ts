import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private service: LoginService,
  ) {
    // empty
  }

  canActivate() {
    return this.service.getProfile()
      .map(user => {
        if (user) {
          console.log('Ok, user is authenticated');
          this.service.authenticated = user;
          return true;
        } else {
          console.log('Who are you?');
          this.router.navigate(['/login']);
          return false;
        }
      });
  }

}
