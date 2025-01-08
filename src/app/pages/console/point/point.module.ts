import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointPageRoutingModule } from './point-routing.module';

import { PointPage } from './point.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointPageRoutingModule,
    SharedModule
  ],
  declarations: [PointPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PointPageModule { }
