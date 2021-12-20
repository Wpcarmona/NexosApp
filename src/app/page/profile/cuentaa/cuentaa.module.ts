import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentaaPageRoutingModule } from './cuentaa-routing.module';

import { CuentaaPage } from './cuentaa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentaaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CuentaaPage]
})
export class CuentaaPageModule {}
