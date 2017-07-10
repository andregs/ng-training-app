import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';


import { User } from '../../entity/model';
import { UserService } from './user.service';

@Injectable()
export class UserListResolver implements Resolve<User[]> {

  constructor(
    private service: UserService,
  ) {
    // empty
  }

  resolve(): Observable<User[]> {
    return this.service.getUsers();
  }

}
