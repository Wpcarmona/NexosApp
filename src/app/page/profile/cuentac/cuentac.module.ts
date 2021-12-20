import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentacPageRoutingModule } from './cuentac-routing.module';

import { CuentacPage } from './cuentac.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentacPageRoutingModule,
    ReactiveFormsModule,
    
  ],
  declarations: [CuentacPage]
})
export class CuentacPageModule {}
