import { NgModule } from '@angular/core';
import { MyOrdersRoutingModule } from './my-orders.routing';
import { MyOrdersComponent } from './my-orders.component';

@NgModule({
  imports: [
    MyOrdersRoutingModule,
  ],
  declarations: [MyOrdersComponent]
})
export class MyOrdersModule { }
