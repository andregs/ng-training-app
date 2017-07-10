import { Component, OnInit } from '@angular/core';

import { ProductService } from './admin/products/product.service';
import { Category } from './entity/model';

@Component({
  selector: 'mc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  categories: Category[];

  constructor(
    private productService: ProductService,
  ) {
    // empty
  }

  ngOnInit() {
    this.productService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      },
    );
  }

}
