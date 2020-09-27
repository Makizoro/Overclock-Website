import { Injectable } from '@angular/core';
import {Message} from '../entities/message.model'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageCollection: AngularFirestoreCollection<Message>;

  constructor(private afs: AngularFirestore) { }

  //Add message
  async addMessage(topicDocId: string, message: Message): Promise<void> {
     this.messageCollection = this.afs.collection('Forum').doc(topicDocId).collection('Message');
     this.messageCollection.add(message);
    }

  // Get messages given a certain topic name
  getMessage(topicDocId: string): any{
    return this.afs.collection('Forum').doc(topicDocId).collection('Message')
     .snapshotChanges().pipe(
       map(changes => changes.map(a => {
         const data = a.payload.doc.data() as Message;
         return data;
       }))
     );
    }

     // Get messages given a certain topic with a specific csi
     getCSIMessage(topicDocId: string, csiName: string): any{
      return this.afs.collection('Forum').doc(topicDocId).collection('Message', 
      ref => ref.where('csi', '==', '' + csiName))
       .snapshotChanges().pipe(
         map(changes => changes.map(a => {
           const data = a.payload.doc.data() as Message;
           return data;
         }))
       );
      }


}
