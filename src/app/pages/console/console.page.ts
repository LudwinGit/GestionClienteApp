import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/models/user.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.page.html',
  styleUrls: ['./console.page.scss'],
})
export class ConsolePage implements OnInit {
  router = inject(Router)
  firebaseService = inject(FirebaseService)
  utilsService = inject(UtilsService)

  pages = [
    { title: 'Inicio', url: '/console/home', icon: 'home-outline' },
    { title: 'Clientes', url: '/console/clients', icon: 'documents-outline' },
    { title: 'Saldos', url: '/console/balances', icon: 'diamond-outline' }
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
