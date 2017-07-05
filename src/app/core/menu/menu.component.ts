import { Component } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {
    // empty
  }

  get authenticated() {
    return this.loginService.authenticated;
  }

  logout() {
    this.loginService.logout().subscribe(
      () => {
        console.log('Bye.');
        this.router.navigate(['login']);
      },
    );
  }

}
