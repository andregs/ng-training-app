import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { Category } from '../../entity/model';
import { ProductService } from './product.service';

@Injectable()
export class CategoryResolver implements Resolve<Category> {

  constructor(
    private service: ProductService,
  ) {
    // empty
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Category> {
    const id = + route.paramMap.get('categoryId')!;
    return this.service.getCategory(id);
  }

}
