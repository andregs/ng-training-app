import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { LoginService } from './login.service';
import { User } from '../entity/customer.1';

@Injectable()
export class UserListResolver implements Resolve<User[]> {

  constructor(
    private service: LoginService,
  ) {
    // empty
  }

  resolve(): Observable<User[]> {
    return this.service.getUsers();
  }

}
