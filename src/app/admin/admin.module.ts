import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { AdminRoutingModule } from './admin.routing';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';

@NgModule({
  imports: [
    AdminRoutingModule,
  ],
  declarations: [AdminComponent, UsersComponent, ProductsComponent, UserFormComponent, UserListComponent]
})
export class AdminModule { }
