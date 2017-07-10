import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../login/login.service';
import { Category } from '../../entity/model';

@Component({
  selector: 'mc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input() categories: Category[];

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
