import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  ModalController,
  ToastController,
  AlertController,
  ToastOptions,
  ModalOptions,
  AlertOptions
} from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingController = inject(LoadingController)
  toastController = inject(ToastController)
  // modalController = inject(ModalController)
  alertController = inject(AlertController)
  router = inject(Router)

  loading(message: string) {
    return this.loadingController.create({
      message: message,
      spinner: 'crescent'
    })
  }

  async presentToast(options: ToastOptions) {
    const toast = await this.toastController.create(options);
    toast.present();
  }

  // ===================== Modal =====================
  // async presentModal(options: ModalOptions) {
  //   const modal = await this.modalController.create(options);
  //   await modal.present();

  //   const { data } = await modal.onWillDismiss();
  //   if (data) return data
  // }

  // dismissModal(data?: any) {
  //   return this.modalController.dismiss(data)
  // }

  // ===================== Alert =====================
  async presentAlert(options: AlertOptions) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }

  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }
}
