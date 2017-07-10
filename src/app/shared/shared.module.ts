import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ngx-bootstrap';

@NgModule({
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    Ng2BootstrapModule,
  ],
  providers: [
    // do not provide stuff here
  ],
})
export class SharedModule { }
