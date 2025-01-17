import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/common/models/user.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';
import { Device, DeviceId, DeviceInfo } from '@capacitor/device';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  private readonly utilsSvc = inject(UtilsService)
  private readonly firebaseSvc = inject(FirebaseService)
  usuario: string = "ninguno"
  device: DeviceId
  deviceInfo: DeviceInfo
  web: boolean = Capacitor.getPlatform() === 'web'

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  currentUser: User

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading('Ingresando...')
      await loading.present()
      this.firebaseSvc.signIn(this.form.value as User).then(res => {
        if (res.user) {
          this.setUidDevice(res.user.uid)
          this.getUserInfo(res.user.uid)
        }
      })
        .catch(err => {
          this.utilsSvc.presentToast({
            message: 'El correo o la contraseña son incorrectos',
            color: 'danger',
            duration: 2000
          })
        })
        .finally(() => {
          loading.dismiss()
        });
    }
  }

  async submitP() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading('Ingresando...')
      await loading.present()
      try {
        const res = await this.firebaseSvc.signIn(this.form.value as User);
        if (res.user) {
          await this.setUidDeviceP(res.user.uid)
          await this.getUserInfoP(res.user.uid)

          if (this.currentUser && this.currentUser.role === 'admin') {
            this.utilsSvc.routerLink('/console')
          }
          if (this.currentUser && this.currentUser.role === 'user') {
            this.utilsSvc.routerLink('/main')
          }
          
        }
      } catch (error) {
        this.utilsSvc.presentToast({
          message: 'El correo o la contraseña son incorrectos',
          color: 'danger',
          duration: 2000,
        });
      }
      finally {
        loading.dismiss()
      }
    }
  }

  async ionViewDidEnter() {
    await Geolocation.getCurrentPosition();
  }

  async getUserInfo(uid: string) {
    const loading = await this.utilsSvc.loading('')
    await loading.present()

    let path = `customers/${uid}`

    this.firebaseSvc.getDocument(path).then((user: User) => {
      this.utilsSvc.saveInLocalStorage('user', user)
      this.utilsSvc.routerLink('/main/home')
      this.form.reset()

      this.utilsSvc.presentToast({
        message: `Bienvenido ${user.name}`,
        duration: 500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle-outline'
      })

    }).catch(error => {
      this.utilsSvc.presentToast({
        message: error.message,
        color: 'danger',
        duration: 2500
      })
    }).finally(() => {
      loading.dismiss()
    });

  }

  async getUserInfoP(uid: string) {
    try {
      const path = `users/${uid}`;
      const user = (await this.firebaseSvc.getDocument(path)) as User;
      this.currentUser = user
      this.utilsSvc.saveInLocalStorage('user', user);
      this.form.reset();
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
      this.utilsSvc.presentToast({
        message: error.message || 'Error al obtener la información del usuario.',
        color: 'danger',
        duration: 2500,
      });
    }
  }

  async getData() {
    this.device = await Device.getId();
    this.deviceInfo = await Device.getInfo();
    const user = await this.utilsSvc.getKeyValuePersist("user")
    this.usuario = user
  }

  async setUidDevice(uid: string) {
    const user = await this.utilsSvc.getKeyValuePersist("user")
    if (!(user && user == uid)) {
      const deviceId = await Device.getId();
      const info = await Device.getInfo();
      await this.utilsSvc.removeKeyValuePersist("user")
      await this.utilsSvc.setKeyValuePersist("user", uid)
      await this.utilsSvc.setKeyValuePersist("device", deviceId.identifier)
      let path = `customers/${uid}/devices/${deviceId.identifier}`
      const ob = {
        name: info.name ?? "",
        model: info.model,
        platform: info.platform
      }
      this.firebaseSvc.setDocument(path, ob).then(() => { })
      this.firebaseSvc.setSessionCurrentLocation(uid, deviceId.identifier).then(() => { })
    }
  }

  async setUidDeviceP(uid: string) {
    try {
      const user = await this.utilsSvc.getKeyValuePersist("user")
      if (!(user && user == uid)) {
        const deviceId = await Device.getId();
        const info = await Device.getInfo();

        await this.utilsSvc.removeKeyValuePersist("user")
        await this.utilsSvc.setKeyValuePersist("user", uid)
        await this.utilsSvc.setKeyValuePersist("device", deviceId.identifier)

        let path = `customers/${uid}/devices/${deviceId.identifier}`
        const ob = {
          name: info.name ?? "",
          model: info.model,
          platform: info.platform
        }

        await Promise.all([
          this.firebaseSvc.setDocument(path, ob),
          this.firebaseSvc.setSessionCurrentLocation(uid, deviceId.identifier)
        ])
      }
    } catch (error) {
      console.error('Error al configurar el UID del dispositivo:', error);
      this.utilsSvc.presentToast({
        message: 'Error al configurar el dispositivo.',
        color: 'danger',
        duration: 2000,
      });
    }
  }
}
