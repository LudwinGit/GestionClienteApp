import { Component, inject, OnInit } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { Customer } from 'src/app/common/models/customer.model';
import { Quota } from 'src/app/common/models/quota.model';
import { User } from 'src/app/common/models/user.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage {
  quotas_customer: Quota[] = []
  loading: boolean = true;
  firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)

  user(): User {
    return this.utilSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getOverdueQuotas()
  }

  getOverdueQuotas() {
    let path = `quotas`

    this.firebaseSvc
      .getCollectionChanges(path,
        where("date_limit", "<", new Date()),
        where("status", "==", "PENDIENTE")
      )
      .subscribe({
        next: (res: Quota[]) => {
          this.quotas_customer = res;
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
          this.loading = false;
        },
      })
  }
}
