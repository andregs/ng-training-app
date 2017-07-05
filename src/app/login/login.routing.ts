import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { UserListResolver } from './user-list.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    resolve: { users: UserListResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
