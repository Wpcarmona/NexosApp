import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'cuentac',
    loadChildren: () => import('./cuentac/cuentac.module').then( m => m.CuentacPageModule)
  },
  {
    path: 'cuentaa',
    loadChildren: () => import('./cuentaa/cuentaa.module').then( m => m.CuentaaPageModule)
  },
  {
    path: 'scanqr',
    loadChildren: () => import('./scanqr/scanqr.module').then( m => m.ScanqrPageModule)
  },
  {
    path: 'tranfer',
    loadChildren: () => import('./tranfer/tranfer.module').then( m => m.TranferPageModule)
  },
  /*{
    path: 'modal/:id',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
