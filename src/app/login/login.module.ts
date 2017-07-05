import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing';
import { LoginService } from './login.service';
import { SharedModule } from '../shared/shared.module';
import { UserListResolver } from './user-list.guard';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule,
  ],
  declarations: [LoginComponent],
  providers: [
    LoginService,
    UserListResolver,
  ],
})
export class LoginModule { }
