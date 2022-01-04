import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranferPage } from './tranfer.page';

const routes: Routes = [
  {
    path: '',
    component: TranferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranferPageRoutingModule {}
