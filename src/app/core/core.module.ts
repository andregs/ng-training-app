import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../shared/shared.module';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    SharedModule,

    // 3rd-party root-level singletons here
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
  ],

  // your own root-level singletons here
  providers: [
    AuthGuard,
  ],

  // declarations required by app.component.html
  declarations: [
    MenuComponent,
    ErrorComponent,
  ],
  exports: [
    MenuComponent,
  ],
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import CoreModule in the AppModule only.');
    }
  }

}
