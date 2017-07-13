import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  @ViewChild('categoryNameField') categoryNameField: ElementRef;

  @ViewChild('productForm') form: NgForm;

  @ViewChild('categoryList') categoryList: NgModel;
  @ViewChild('name') name: NgModel;
  @ViewChild('nameField') nameField: ElementRef;
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
    private router: Router,
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
    this.category = new Category();
    const catName: HTMLInputElement = this.categoryNameField.nativeElement;
    catName.focus();
  }

  onCategoryRemove() {
    this.service.delete(this.category).subscribe(
      () => {
        console.log('Category removed.');
        this.router.navigate(['admin']);
      },
    );
  }

  onSubmit() {
    console.log(this.price);
  }

  onInput(e: any) {
    console.log('input', e);
  }

  onCategoryNameChange() {
    if (this.categoryName.valid) {
      this.category.name = this.categoryName.value;
      this.service.save(this.category).subscribe(
        () => {
          console.log('Category saved.');
          const name: HTMLInputElement = this.nameField.nativeElement;
          name.focus();
        },
      );
    }
  }

}
