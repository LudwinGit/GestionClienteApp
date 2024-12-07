import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/models/user.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  router = inject(Router)
  firebaseService = inject(FirebaseService)
  utilsService = inject(UtilsService)

  pages = [
    { title: 'Inicio', url: '/main/home', icon: 'home-outline' },
    { title: 'Pedidos', url: '/main/orders', icon: 'documents-outline' },
    { title: 'Puntos', url: '/main/points', icon: 'diamond-outline' },
    { title: 'Promociones', url: '/main/promotions', icon: 'sparkles-outline' },
  ]

  currentPath: string = ''

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event?.url) this.currentPath = event.url
    })
  }

  user(): User {
    return this.utilsService.getFromLocalStorage('user');
  }

  signOut(): void {
    this.firebaseService.signOut();
  }
}
