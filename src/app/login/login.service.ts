import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Serialize, Deserialize } from 'cerialize';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { User } from '../entity/customer.1';
import { handleError } from '../core/error/error.function';

@Injectable()
export class LoginService {

  private user: User | null;

  constructor(
    private http: Http,
    private router: Router,
  ) {
    // empty
  }

  get authenticated(): User | null {
    return this.user;
  }

  getUsers(): Observable<User[]> {
    return this.http.get('/api/users')
      .map(res => {
        if (res.status !== 200) return Observable.throw(res);
        const list = Deserialize(res.json(), User) as User[];
        console.log('Users', list);
        return list;
      })
      .catch(e => handleError(e, this.router));
  }

  login(user: User): Observable<User> {
    const body = Serialize(user);
    return this.http.post('/api/login', body)
      .mergeMap(r => {
        if (r.status === 204) {
          this.user = user;
          return Observable.of(user);
        } else {
          this.user = null;
          return Observable.throw(r);
        }
      })
      .catch(e => handleError(e, this.router));
  }

  logout(): Observable<null> {
    return this.http.get('/api/logout')
      .mergeMap(r => {
        if (r.status === 204) {
          this.user = null;
          return Observable.of(null);
        } else {
          return Observable.throw(r);
        }
      })
      .catch(e => handleError(e, this.router));
  }

}
