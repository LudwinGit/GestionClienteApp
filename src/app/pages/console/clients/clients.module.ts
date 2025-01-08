import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClientsPageRoutingModule } from './clients-routing.module';
import { ClientsPage } from './clients.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Tag } from 'primeng/tag';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientsPageRoutingModule,
    SharedModule,
    ButtonModule,
    TableModule,
    IconField,
    InputIcon,
    Tag
  ],
  declarations: [ClientsPage]
})
export class ClientsPageModule {}
