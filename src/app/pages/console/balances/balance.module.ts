import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BalancePageRoutingModule } from './balance-routing.module';

import { BalancePage } from './balance.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Tag } from 'primeng/tag';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BalancePageRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule,
    IconField,
    InputIcon,
    Tag
  ],
  declarations: [BalancePage]
})
export class BalancePageModule { }
