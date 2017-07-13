import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Category, Product } from '../../entity/model';
import { ProductService } from './product.service';

@Component({
  selector: 'mc-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  category: Category;

  categories: Category[];

  newProduct = new Product();

  @ViewChild('categoryName') categoryName: NgModel;

  @ViewChild('productForm') form: NgForm;

  @ViewChild('categoryList') categoryList: NgModel;
  @ViewChild('name') name: NgModel;
  @ViewChild('color') color: NgModel;
  @ViewChild('price') price: NgModel;

  colors = [
    'Aquamarine', 'Black', 'Blue', 'BlueViolet', 'Brown', 'Chocolate',
    'Coral', 'Crimson', 'Cyan', 'DarkCyan', 'DarkGreen', 'DarkOrange',
    'DarkRed', 'DarkViolet', 'DeepPink', 'Fuchsia', 'Gold', 'Green',
    'HotPink', 'Indigo', 'LimeGreen', 'Orange', 'Red', 'Salmon',
    'Turquoise', 'Violet', 'Yellow',
  ];

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
  ) {
    // empty
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.category = data.category;
      this.categories = data.categories;
      this.newProduct.categoryId = this.category.id;
    });
  }

  validationClasses(model: NgModel) {
    return {
      'has-success': model.touched && model.valid,
      'has-danger': model.touched && model.invalid,
    };
  }

  onCategoryNew() {
    console.log('TODO new');
  }

  onCategoryRemove() {
    this.service.delete(this.category);
  }

  onSubmit() {
    console.log(this.price);
  }

  onInput(e: any) {
    console.log('input', e);
  }

  onCategoryNameChange() {
    if (this.categoryName.valid) {
      const backup = this.category.name;
      this.category.name = this.categoryName.value;
      this.service.save(this.category).subscribe(
        () => {
          console.log('Category saved.');
        },
        error => {
          this.category.name = backup;
          console.error('Unable to save the category:', error);
        },
      );
    }
  }

}
