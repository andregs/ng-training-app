import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  providers: [
    // do not provide stuff here
  ],
})
export class SharedModule { }
