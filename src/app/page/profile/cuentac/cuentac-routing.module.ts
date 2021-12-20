import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentacPage } from './cuentac.page';

const routes: Routes = [
  {
    path: '',
    component: CuentacPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentacPageRoutingModule {}
