import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { AdminRoutingModule } from './admin.routing';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserService } from './users/user.service';
import { SharedModule } from '../shared/shared.module';
import { ProductService } from './products/product.service';


@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminComponent,
    UsersComponent,
    ProductsComponent,
    UserFormComponent,
    UserListComponent,
  ],
  providers: [
    UserService,
    ProductService,
  ]
})
export class AdminModule { }
