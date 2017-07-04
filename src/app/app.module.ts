import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { LoginModule } from './login/login.module';
import { ShopModule } from './shop/shop.module';
import { AdminModule } from './admin/admin.module';
import { MyOrdersModule } from './my-orders/my-orders.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,

    // features
    LoginModule,
    ShopModule,
    AdminModule,
    MyOrdersModule,

    // AppRoutingModule must come after our features (above),
    // because features declare routes more specific than the ones
    // declared at AppRoutingModule.
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
