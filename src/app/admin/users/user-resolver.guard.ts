import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { User } from '../../entity/model';
import { UserService } from './user.service';

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(
    private service: UserService,
  ) {
    // empty
  }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = route.paramMap.get('id')!;
    if (id === 'new') {
      return Observable.of(new User());
    }
    return this.service.getUser(+ id);
  }

}
