import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop.routing';
import { ShopComponent } from './shop.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
  ],
  declarations: [ShopComponent, ProductCardComponent, CartComponent]
})
export class ShopModule { }
