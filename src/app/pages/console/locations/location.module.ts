import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationPage } from './location.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationPageRoutingModule } from './location-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationPageRoutingModule,
    SharedModule
  ],
  declarations: [LocationPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocationPageModule { }
