import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../login/login.service';
import { Category } from '../../entity/model';
import { ProductService } from '../../admin/products/product.service';

@Component({
  selector: 'mc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  categories: Category[];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private productService: ProductService,
  ) {
    // empty
  }

  ngOnInit() {
    this.productService.getCategories().subscribe(this.onCategoriesLoaded);
    this.productService.categorySaved.subscribe(this.onCategorySaved);
    this.productService.categoryDeleted.subscribe(this.onCategoryDeleted);
  }

  get authenticated() {
    return this.loginService.authenticated;
  }

  logout() {
    this.loginService.logout().subscribe(
      () => {
        console.log('Bye.');
        this.router.navigate(['login']);
      },
    );
  }

  // remember "this"?
  // if those callbacks weren't arrow functions, their "this" would be undefined.

  onCategoriesLoaded = (categories: Category[]) => {
    this.categories = categories;
  }

  onCategorySaved = (saved: Category) => {
    const found = this.categories.find(c => c.id === saved.id);
    if (found) { // it was updated
      Object.assign(found, saved);
    } else { // it was created
      this.categories.push(saved);
    }
  }

  onCategoryDeleted = (deleted: Category) => {
    this.categories = this.categories.filter(c => c.id !== deleted.id);
  }

}
