import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Deserialize, Serialize } from 'cerialize';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { User } from '../../entity/model';
import { handleError } from '../../core/error/error.function';

@Injectable()
export class UserService {

  readonly endpoint = '/api/users';

  constructor(
    private http: Http,
    private router: Router,
  ) {
    // empty
  }

  getUsers(): Observable<User[]> {
    return this.http.get(this.endpoint)
      .mergeMap(res => {
        if (res.status !== 200) return Observable.throw(res);
        const userList = Deserialize(res.json(), User) as User[];
        return Observable.of(userList);
      })
      .catch(e => handleError(e, this.router));
  }

  getUser(id: number): Observable<User> {
    return this.http.get(`${this.endpoint}/${id}`)
      .mergeMap(res => {
        if (res.status !== 200) return Observable.throw(res);
        const user = Deserialize(res.json(), User) as User;
        return Observable.of(user);
      })
      .catch(e => handleError(e, this.router));
  }

  delete(user: User): Observable<void> {
    return this.http.delete(`${this.endpoint}/${user.id}`)
      .mergeMap(res => {
        if (res.status !== 204) {
          return Observable.throw(res);
        }
        return Observable.of(void 0);
      })
      .catch(e => handleError(e, this.router));
  }

  save(user: User): Observable<void> {
    const body = Serialize(user);
    const save$ = user.id
      ? this.http.put(`${this.endpoint}/${user.id}`, body)
      : this.http.post(this.endpoint, body);

    return save$.mergeMap(
      res => {
        if ([201, 204].includes(res.status)) {
          return Observable.of(void 0);
        }
        return Observable.throw(res);
      })
      .catch(e => handleError(e, this.router));
  }
}
