import { Component, inject } from '@angular/core';
import { Customer } from 'src/app/common/models/customer.model';
import { User } from 'src/app/common/models/user.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage {
  customers: Customer[] = []
  loading: boolean = true;
  firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)

  user(): User {
    return this.utilSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getCustomers()
  }

  getCustomers() {
    let path = `customers`

    this.firebaseSvc.getCollectionChanges(path)
      .subscribe({
        next: (res: Customer[]) => {
          this.customers = res;
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
          this.loading = false;
        },
      })
  }
}
