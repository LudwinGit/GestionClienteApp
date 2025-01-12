import { Component, inject, OnInit } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { Customer } from 'src/app/common/models/customer.model';
import { Installment } from 'src/app/common/models/installment.model';
import { User } from 'src/app/common/models/user.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage {
  customer_installments: Installment[] = []
  loading: boolean = true;
  firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)

  ionViewWillEnter() {
    this.getOverdueInstallments()
  }

  getOverdueInstallments() {
    let path = `installments`

    this.firebaseSvc
      .getCollectionChanges(path,
        where("date_limit", "<", new Date()),
        where("status", "==", "PENDIENTE")
      )
      .subscribe({
        next: (res: Installment[]) => {
          this.customer_installments = res;
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
          this.loading = false;
        },
      })
  }
}
