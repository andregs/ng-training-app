import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

/** @see https://angular.io/guide/http#always-handle-errors */
export function handleError (error: Response | any, router: Router) {
  let errMsg: string;
  if (error instanceof Response) {
    errMsg = `${error.status} - ${error.statusText}\n${error.text()}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error('UNEXPECTED', errMsg);
  router.navigate(['/error'], { skipLocationChange: true });
  return Observable.empty() as Observable<any>;
}
