import { Injectable } from '@angular/core';
import { Forum } from 'src/app/entities/forum.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ForumService {
  forumCollection: AngularFirestoreCollection<Forum>;

  constructor(private afs: AngularFirestore) {
    this.forumCollection = this.afs.collection('Forum');
   }

   // Add to forum
   async addForum(forum: Forum): Promise<void> {
    this.forumCollection.add(forum);
    }

    // Get messages given a certain topic name
    getMessage(topicName: string): any{
      return this.afs.collection('Forum', ref => ref.where('topic', '==', '' + topicName))
       .snapshotChanges().pipe(
         map(changes => changes.map(a => {
           const data = a.payload.doc.data() as Forum;
           return data;
         }))
       );
      }

    // Get messages given a certain csi name and topic
    getCSIMessage(topicName: string, csiName): any{
      return this.afs.collection('Forum', ref => ref.where('topic', '==', '' + topicName)
      .where('csi', '==', '' + csiName))
       .snapshotChanges().pipe(
         map(changes => changes.map(a => {
           const data = a.payload.doc.data() as Forum;
           return data;
         }))
       );
      }
}
