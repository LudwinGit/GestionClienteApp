import { Component, inject } from '@angular/core';
import { orderBy, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { map, catchError } from 'rxjs';
import { Order } from 'src/app/common/models/order.model';
import { Installment } from 'src/app/common/models/installment.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-quotas',
  templateUrl: './quotas.page.html',
  styleUrls: ['./quotas.page.scss'],
})
export class QuotasPage {
  firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)
  route = inject(ActivatedRoute)
  //obtener el id que viene en la ruta 
  id = this.route.snapshot.paramMap.get('id');
  quotas: Installment[] = []
  order: Order

  ionViewWillEnter() {
    this.getQuotas()
  }

  getQuotas() {
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
