import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranferPageRoutingModule } from './tranfer-routing.module';

import { TranferPage } from './tranfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranferPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [TranferPage],
})
export class TranferPageModule {}
