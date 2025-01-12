import { Component, inject } from '@angular/core';
import { where, orderBy } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { map, catchError } from 'rxjs';
import { Installment } from 'src/app/common/models/installment.model';
import { Order } from 'src/app/common/models/order.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-installments',
  templateUrl: './installments.page.html',
  styleUrls: ['./installments.page.scss'],
})
export class InstallmentsPage {
  firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)
  route = inject(ActivatedRoute)
  //obtener el id que viene en la ruta 
  id = this.route.snapshot.paramMap.get('id');
  quotas: Installment[] = []
  order: Order

  ionViewWillEnter() {
    this.getInstallments()
  }

  getInstallments() {
    let path = `installments`
    this.firebaseSvc
      .getCollectionChanges(path, where('order_uid', '==', this.id), orderBy('no', 'asc'))
      .pipe(
        map((items: any[]) => items.map(item => ({
          ...item,
        }))),
        catchError(error => {
          console.log(error)
          return []
        })
      )
      .subscribe((data: any[]) => {
        this.quotas = data
      })

    this.getOrder()
  }

  getOrder() {
    let path = `orders/${this.id}`
    this.firebaseSvc.getDocument(path).then((data: any) => {
      this.order = data
      this.order.date = data.date.toDate()
    })
  }
}
