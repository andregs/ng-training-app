import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserListResolver } from './users/user-list-resolver.guard';
import { UserFormComponent } from './users/user-form/user-form.component';
import { AdminGuard } from './admin.guard';
import { UserResolver } from './users/user-resolver.guard';
import { CategoryResolver } from './products/category-resolver.guard';
import { CategoryListResolver } from './products/category-list-resolver.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        component: UsersComponent,
        children: [
          {
            path: '',
            component: UserListComponent,
            resolve: { users: UserListResolver },
          },
          {
            path: ':id',
            component: UserFormComponent ,
            resolve: { user: UserResolver },
          },
        ],
      },
      {
        path: 'products/:categoryId',
        component: ProductsComponent,
        resolve: {
          category: CategoryResolver,
          categories: CategoryListResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AdminGuard,
    UserListResolver,
    UserResolver,
    CategoryResolver,
    CategoryListResolver,
  ],
})
export class AdminRoutingModule { }
