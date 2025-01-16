import { inject, Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { Geolocation } from '@capacitor/geolocation';
import { Auth, signInWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, collectionData, updateDoc, addDoc, GeoPoint } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth = inject(Auth)
  util = inject(UtilsService)

  //================================== Auth =====================
  getAuth() {
    return this.auth
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(this.getAuth(), user.email, user.password);
  }

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(this.getAuth(), email);
  }

  signOut() {
    this.getAuth().signOut();
    this.util.removeFromLocalStorage('user');
    this.util.routerLink('/auth');
  }

  //================================== Database =====================
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string) {
    return (await (getDoc(doc(getFirestore(), path)))).data()
  }

  getCollectionChanges<T>(path: string, ...collectionQueries: any[]) {
    const refCollection = collection(getFirestore(), path)
    return collectionData(query(refCollection, ...collectionQueries), { idField: 'id' }) as Observable<T[]>
  }

  async updateDocumentID(data: any, path: string, idDoc: string) {
    const document = doc(getFirestore(), path, idDoc)
    return updateDoc(document, data)
  }

  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data)
  }

  // ===================Geolocalizacion=============================
  async setSessionCurrentLocation(uid: string, deviceId: string) {
    const location = await Geolocation.getCurrentPosition();
    const geoPoint = new GeoPoint(location.coords.latitude, location.coords.longitude)
    let path = `customers/${uid}/sessions`
    this.addDocument(path, {
      'coordinates': geoPoint,
      'date': this.util.getTimestampCurrent(),
      'json': JSON.stringify(location),
      'device': deviceId
    }).then(() => { })
  }
}
