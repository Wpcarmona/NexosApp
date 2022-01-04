import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ModalPage } from './modal/modal.page';
import { ModalPageModule } from './modal/modal.module';
import { CuentacPageModule } from './cuentac/cuentac.module';
import { CuentaaPageModule } from './cuentaa/cuentaa.module';
import { ScanqrPageModule } from './scanqr/scanqr.module';
import { TranferPageModule } from './tranfer/tranfer.module';

@NgModule({
  entryComponents: [
    ModalPage,
    CuentacPageModule,
    CuentaaPageModule,
    ScanqrPageModule,
    TranferPageModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
    ModalPageModule,
    CuentacPageModule,
    CuentaaPageModule,
    ScanqrPageModule,
    TranferPageModule,
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
