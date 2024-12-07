import { inject, Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { Auth, signInWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, collectionData, updateDoc } from '@angular/fire/firestore';
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
    localStorage.removeItem('user');
    this.util.routerLink('/auth');
  }

  //================================== Database =====================
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string) {
    return (await (getDoc(doc(getFirestore(), path)))).data()
  }

  getCollectionChanges<T>(path: string, collectionQuery?: any) {
    const refCollection = collection(getFirestore(), path)
    return collectionData(query(refCollection, collectionQuery), { idField: 'id' }) as Observable<T[]>
  }

  async updateDocumentID(data: any, path: string, idDoc: string) {
    const document = doc(getFirestore(), path, idDoc)
    return updateDoc(document, data)
  }
}
