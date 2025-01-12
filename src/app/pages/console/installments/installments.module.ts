import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstallmentsPageRoutingModule } from './installments-routing.module';

import { InstallmentsPage } from './installments.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstallmentsPageRoutingModule,
    SharedModule
  ],
  declarations: [InstallmentsPage]
})
export class InstallmentsPageModule {}
