import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { Category } from '../../entity/model';
import { ProductService } from './product.service';

@Injectable()
export class CategoryListResolver implements Resolve<Category[]> {

  constructor(
    private service: ProductService,
  ) {
    // empty
  }

  resolve(): Observable<Category[]> {
    return this.service.getCategories();
  }

}
