import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Serialize, Deserialize } from 'cerialize';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

import { handleError } from '../core/error/error.function';
import { User } from '../entity/model';

@Injectable()
export class LoginService {

  authenticated: User | null;

  constructor(
    private http: Http,
    private router: Router,
  ) {
    // empty
  }

  login(user: User): Observable<void> {
    const body = Serialize(user);
    return this.http.post('/api/login', body)
      .mergeMap(r => {
        if (r.status === 204) {
          this.authenticated = user;
          return Observable.of(void 0);
        } else {
          return Observable.throw(r);
        }
      })
      .catch(e => handleError(e, this.router));
  }

  logout(): Observable<void> {
    return this.http.get('/api/logout')
      .mergeMap(r => {
        if (r.status === 204) {
          this.authenticated = null;
          return Observable.of(void 0);
        } else {
          return Observable.throw(r);
        }
      })
      .catch(e => handleError(e, this.router));
  }

  getProfile(): Observable<User | null> {
    return this.http.get('/api/authenticated')
      .mergeMap(res => {
        if (res.status === 200) {
          const user = Deserialize(res.json(), User);
          this.authenticated = user;
          return Observable.of(user);
        } else {
          return Observable.throw(res);
        }
      })
      .catch(err => {
        this.authenticated = null;
        if (err instanceof Response && err.status === 401) {
          return Observable.of(null);
        }
        return Observable.throw(err);
      })
      .catch(err => handleError(err, this.router));
  }

}
