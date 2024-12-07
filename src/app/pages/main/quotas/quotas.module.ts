import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuotasPageRoutingModule } from './quotas-routing.module';

import { QuotasPage } from './quotas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuotasPageRoutingModule
  ],
  declarations: [QuotasPage]
})
export class QuotasPageModule {}
