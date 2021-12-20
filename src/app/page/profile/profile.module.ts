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

@NgModule({

  entryComponents: [
    ModalPage,
    CuentacPageModule,
    CuentaaPageModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
    ModalPageModule,
    CuentacPageModule,
    CuentaaPageModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
