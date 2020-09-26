import { Injectable } from '@angular/core';
import { Notification } from 'src/app/entities/notification.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifyCollection: AngularFirestoreCollection<Notification>;

  constructor(private afs: AngularFirestore) {
    this.notifyCollection = this.afs.collection('Notification');
   }

   // CSI adds a notification
   async addNotification(notify: Notification): Promise<void> {
          this.notifyCollection.add(notify);
    }

    // Get notifications of a CSI 
    getSubList(csiName: string): any{
      return this.afs.collection('Notification', ref => ref.where('csi', '==', '' + csiName))
       .snapshotChanges().pipe(
         map(changes => changes.map(a => {
           const data = a.payload.doc.data() as Notification;
           return data;
         }))
       );
      }
}
