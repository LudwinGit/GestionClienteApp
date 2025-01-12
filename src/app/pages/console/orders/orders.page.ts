import { Component, inject } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { catchError, map } from 'rxjs';
import { Installment } from 'src/app/common/models/installment.model';
import { Order } from 'src/app/common/models/order.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage {
  orders: Order[] = []
  loading: boolean = true;
  firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)
  route = inject(ActivatedRoute)

  id = this.route.snapshot.paramMap.get('id');

  ionViewWillEnter() {
    this.getOrders()
  }

  getOrders() {
    let path = `orders`
    this.firebaseSvc.getCollectionChanges(path, where('customer_uid', '==', this.id)).pipe(
      map((items: any[]) =>
        items.map(item => ({
          ...item
        }))
      ),
      catchError(error => {
        console.log(error)
        return []
      })
    )
      .subscribe((data: any[]) => {
        this.orders = data
        this.loading = false
      })
  }
}
