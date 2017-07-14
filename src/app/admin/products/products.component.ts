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

  product: Product;

  @ViewChild('categoryName') categoryName: NgModel;
  @ViewChild('categoryNameField') categoryNameField: ElementRef;

  @ViewChild('productForm') productForm: NgForm;

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
      this.product = new Product();
      this.categories = data.categories;
      this.product.categoryId = this.category.id;
    });
  }

  validationClasses(model: NgModel) {
    return {
      'has-success': model.dirty && model.valid,
      'has-danger': model.dirty && model.invalid,
    };
  }

  onCategorySave() {
    if (this.categoryName.valid) {
      this.category.name = this.categoryName.value;
      this.service.saveCategory(this.category).subscribe(
        () => {
          console.log('Category saved.');
          this.product.categoryId = this.category.id;
          const name: HTMLInputElement = this.nameField.nativeElement;
          name.focus();
        },
      );
    }
  }

  onCategoryNew() {
    this.category = new Category();
    this.product = new Product();
    const catName: HTMLInputElement = this.categoryNameField.nativeElement;
    catName.focus();
  }

  onCategoryDelete() {
    this.service.deleteCategory(this.category).subscribe(
      () => {
        console.log('Category deleted.');
        this.router.navigate(['admin']);
      },
    );
  }

  onProductSave() {
    this.service.saveProduct(this.product).subscribe(
      () => {
        console.log('Product saved.');
        if (this.product.categoryId === this.category.id) {
          this.category.add(this.product);
        }
        const name: HTMLInputElement = this.nameField.nativeElement;
        this.product = new Product({ categoryId: this.category.id });
        name.focus();
        // resetForm clears validation errors.
        // setTimeout skips 1 tick to avoid "expression has changed after it was checked" error
        setTimeout(() => this.productForm.resetForm());
      },
    );
  }

  onProductEdit(product: Product) {
    this.product = product;
    this.category.remove(product);
  }

  onProductDelete(product: Product) {
    this.service.deleteProduct(product).subscribe(
      () => {
        console.log('Product deleted.');
        this.category.remove(product);
      },
    );
  }

}
