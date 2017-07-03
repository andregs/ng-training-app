import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './core/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'error',
    component: ErrorComponent,
    data: { kind: 'runtime' },
  },
  {
    path: '**',
    component: ErrorComponent,
    data: { kind: '404' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    // guards
  ],
})
export class AppRoutingModule { }
