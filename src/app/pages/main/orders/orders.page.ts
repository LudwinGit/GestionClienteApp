import { Component, inject, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { where } from '@angular/fire/firestore';
import { map, catchError } from 'rxjs';
import { Order } from 'src/app/common/models/order.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage {
  firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)

  orders: Order[] = []
  user(): User {
    return this.utilSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getOrders()
  }

  getOrders() {
    let path = `orders`
    this.firebaseSvc.getCollectionChanges(path, where('uid', '==', this.user().uid)).pipe(
      map((items: any[]) =>
        items.map(item => ({
          ...item,
          date: item.date.toDate()
        }))
      ),
      catchError(error => {
        console.log(error)
        return []
      })
    )
      .subscribe((data: any[]) => {
        this.orders = data
      })
  }
}
