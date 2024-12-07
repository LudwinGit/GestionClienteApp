import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuotasPageRoutingModule } from './quotas-routing.module';

import { QuotasPage } from './quotas.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuotasPageRoutingModule,
    SharedModule
  ],
  declarations: [QuotasPage]
})
export class QuotasPageModule {}
