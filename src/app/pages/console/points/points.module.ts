import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointsPageRoutingModule } from './points-routing.module';

import { PointsPage } from './points.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddComponent } from './add/add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointsPageRoutingModule,
    SharedModule
  ],
  declarations: [PointsPage, AddComponent]
})
export class PointsPageModule {}
