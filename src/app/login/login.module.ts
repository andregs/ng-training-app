import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing';

@NgModule({
  imports: [
    LoginRoutingModule,
  ],
  declarations: [LoginComponent],
})
export class LoginModule { }
