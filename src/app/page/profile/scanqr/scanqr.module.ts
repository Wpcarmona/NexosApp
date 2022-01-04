import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScanqrPageRoutingModule } from './scanqr-routing.module';
import { ScanqrPage } from './scanqr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanqrPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ScanqrPage],
})
export class ScanqrPageModule {}
