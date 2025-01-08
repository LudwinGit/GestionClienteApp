import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/common/models/user.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { UtilsService } from 'src/app/common/services/utils.service';
import { Customer } from 'src/app/common/models/customer.model';
import { GoogleMap } from "@capacitor/google-maps";
import { environment } from 'src/environments/environment';
import { GeoPoint, orderBy } from '@angular/fire/firestore';
import { limit } from '@firebase/firestore';
const apiKey = environment.firebase.apiKey;

@Component({
  selector: 'app-point',
  templateUrl: './point.page.html',
  styleUrls: ['./point.page.scss'],
})
export class PointPage {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  firebaseSvc = inject(FirebaseService)
  utilSvc = inject(UtilsService)
  route = inject(ActivatedRoute)
  id = this.route.snapshot.paramMap.get('id');
  customer: Customer
  defaultGeoPoin: GeoPoint

  user(): User {
    return this.utilSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getCustomer()
  }

  getCustomer() {
    let path = `customers/${this.id}`
    this.firebaseSvc.getDocument(path)
      .then((data: any) => {
        this.customer = data

        this.firebaseSvc.getCollectionChanges(path + "/sessions",
          orderBy('date', 'desc'), limit(5))
          .subscribe({
            next: (res: any[]) => {
              this.customer.sessions = res
              this.initMap()
            },
            error: (error) => {
              console.log(error);
            }
          })

      })
      .catch(error => {
        console.log(error)
      })
  }

  async initMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: this.mapRef.nativeElement, // reference to the capacitor-google-map element
      apiKey: apiKey, // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: 15.7835,
          lng: -90.2308,
        },
        zoom: 7, // The initial zoom level to be rendered by the map
      },
    });

    await this.addMarkers();
  }

  async addMarkers() {
    for (const session of this.customer.sessions) {
      await this.newMap.addMarker({
        coordinate: {
          lat: session.coordinates.latitude,
          lng: session.coordinates.longitude,
        },
      });
    }
  }
}
