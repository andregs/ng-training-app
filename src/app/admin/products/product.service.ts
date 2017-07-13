import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Deserialize, Serialize } from 'cerialize';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Category, Product } from '../../entity/model';
import { handleError } from '../../core/error/error.function';

@Injectable()
export class ProductService {

  readonly endpoint = '/api/categories';
  readonly categorySaved = new EventEmitter<Category>();
  readonly categoryDeleted = new EventEmitter<Category>();

  constructor(
    private http: Http,
    private router: Router,
  ) {
    // empty
  }

  getCategories(): Observable<Category[]> {
    return this.http.get(this.endpoint)
      .mergeMap(res => {
        if (res.status !== 200) return Observable.throw(res);
        const categoryList = Deserialize(res.json(), Category) as Category[];
        return Observable.of(categoryList);
      })
      .catch(e => handleError(e, this.router));
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get(`${this.endpoint}/${id}`)
      .mergeMap(res => {
        if (res.status !== 200) return Observable.throw(res);
        const category = Deserialize(res.json(), Category) as Category;
        return Observable.of(category);
      })
      .catch(e => handleError(e, this.router));
  }

  delete(category: Category): Observable<void> {
    return this.http.delete(`${this.endpoint}/${category.id}`)
      .mergeMap(res => {
        if (res.status !== 204) return Observable.throw(res);
        this.categoryDeleted.emit(category);
        return Observable.of(void 0);
      })
      .catch(e => handleError(e, this.router));
  }

  save(record: Category | Product): Observable<void> {
    return record instanceof Category
      ? this.saveCategory(record)
      : this.saveProduct(record);
  }

  private saveCategory(category: Category): Observable<void> {
    const body = Serialize(category);
    const save$ = category.id
      ? this.http.put(`${this.endpoint}/${category.id}`, body)
      : this.http.post(this.endpoint, body);

    return save$.mergeMap(
      res => {
        if ([201, 204].includes(res.status)) {
          if (res.status === 201) { // created
            const generatedId = + res.headers!.get('Location')!.split('/').pop()!;
            category.id = generatedId;
          }
          this.categorySaved.emit(category);
          return Observable.of(void 0);
        }
        return Observable.throw(res);
      })
      .catch(e => handleError(e, this.router));
  }

  private saveProduct(product: Product): Observable<void> {
    const body = Serialize(product);
    const baseUrl = `${this.endpoint}/${product.categoryId}`;
    const save$ = product.id
      ? this.http.put(`${baseUrl}/${product.id}`, body)
      : this.http.post(baseUrl, body);

    return save$.mergeMap(
      res => {
        if ([201, 204].includes(res.status)) {
          if (res.status === 201) { // created
            const generatedId = + res.headers!.get('Location')!.split('/').pop()!;
            product.id = generatedId;
          }
          return Observable.of(void 0);
        }
        return Observable.throw(res);
      })
      .catch(e => handleError(e, this.router));
  }
}
