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
    const isAuthenticated = !!this.service.authenticated;
    if (isAuthenticated) {
      console.log('Ok, user is authenticated');
      return true;
    } else {
      console.log('Who are you?');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
