import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuponesComponent } from './cupones.component';

const routes: Routes = [
  {
    path: '',
    component: CuponesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuponRoutingModule { }
