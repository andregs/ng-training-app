import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../entity/model';
import { LoginService } from './login.service';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users: User[];

  constructor(
    private service: LoginService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // empty
  }

  ngOnInit() {
    this.route.data.subscribe(
      data => this.users = data.users,
    );
  }

  login(user: User) {
    this.service.login(user).subscribe(
      () => {
        console.log('Authenticated:', user);
        this.router.navigate(['shop']);
      },
    );
  }

}
