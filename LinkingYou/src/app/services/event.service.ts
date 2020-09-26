import { Injectable } from '@angular/core';
import { Event } from 'src/app/entities/event.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventCollection: AngularFirestoreCollection<Event>;

  constructor(private afs: AngularFirestore) {
    this.eventCollection = this.afs.collection('Event');
   }

    // CSI adds an event
    async addEvent(event: Event): Promise<void> {
      const docRef = this.afs.collection('Event').ref.where('userId', '==', event.name)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.empty){
            this.eventCollection.add(event);
            alert('Success!');
          } else {
            alert('Event already sent!');
          }
        });
      }

      // Get event list given csi name
      getEventList(csiName: string): any{
        return this.afs.collection('Event', ref => ref.where('csi', '==', '' + csiName))
         .snapshotChanges().pipe(
           map(changes => changes.map(a => {
             const data = a.payload.doc.data() as Event;
             return data;
           }))
         );
        }

      // Get a event document given name
      getEvent(name: string): any{
        return this.afs.collection('Event', ref => ref.where('name', '==', '' + name))
         .snapshotChanges().pipe(
           map(changes => changes.map(a => {
             const data = a.payload.doc.data() as Event;
             return data;
           }))
         );
        }
}
