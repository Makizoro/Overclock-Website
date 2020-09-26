import { Injectable } from '@angular/core';
import { Subscription } from 'src/app/entities/subscription.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  subCollection: AngularFirestoreCollection<Subscription>;
  subCollectionRequest: AngularFirestoreCollection<Subscription>;


  constructor(private afs: AngularFirestore) { 
    this.subCollection = this.afs.collection('Subscription');
    this.subCollectionRequest = this.afs.collection('Subscription_Request');
  }

  // For user to request to join a CSI
  async addSubRequest(sub: Subscription): Promise<void> {
    const docRef = this.afs.collection('Subscription').ref.where('userId', '==', sub.userId)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty){
          this.subCollectionRequest.add(sub);
          alert('Success!');
        } else {
          alert('Subscription already sent!');
        }
      });
    }

    // When a CSI accepts a user request to join a CSI
    async addSubscription(sub: Subscription): Promise<void> {
      const docRef = this.afs.collection('Subscription').ref.where('userId', '==', sub.userId)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.empty){
            this.subCollection.add(sub);
            alert('Success!');
          } else {
            alert('Subscription already accepted!');
          }
        });
      }

      // Get list of CSIs subscribed to
      getSubList(userId: string): any{
        return this.afs.collection('Subscription', ref => ref.where('userId', '==', '' + userId))
         .snapshotChanges().pipe(
           map(changes => changes.map(a => {
             const data = a.payload.doc.data() as Subscription;
             data.docId = a.payload.doc.id;
             return data;
           }))
         );
        }

      // Get list of of people subscribed to a csi
      getCSISubList(csiName: string): any{
        return this.afs.collection('Subscription', ref => ref.where('csi', '==', '' + csiName))
         .snapshotChanges().pipe(
           map(changes => changes.map(a => {
             const data = a.payload.doc.data() as Subscription;
             data.docId = a.payload.doc.id;
             return data;
           }))
         );
        }

   // Get list of user requests to accept or reject 
   getCSIRequests(csiName: string): any{
    return this.afs.collection('Subscription_Request', ref => ref.where('csi', '==', '' + csiName))
     .snapshotChanges().pipe(
       map(changes => changes.map(a => {
         const data = a.payload.doc.data() as Subscription;
         data.docId = a.payload.doc.id;
         return data;
       }))
     );
    }
    //Remove from request collection 
    delete(docId: string): void{
      this.afs.doc<Subscription>('Subscription_Request/'+docId).delete();
    }
}
