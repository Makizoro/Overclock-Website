import { Injectable } from '@angular/core';
import { Forum } from 'src/app/entities/forum.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import DocumentReference = firebase.firestore.DocumentReference;


@Injectable({
  providedIn: 'root'
})
export class ForumService {
  forumCollection: AngularFirestoreCollection<Forum>;

  constructor(private afs: AngularFirestore) {
    this.forumCollection = this.afs.collection('Forum');
   }

   // Add to forum
   async addForum(forum: Forum): Promise<DocumentReference> {
    return await this.forumCollection.add(forum);
    }

    // Get topics
    getTopics(): any{
      return this.afs.collection('Forum')
       .snapshotChanges().pipe(
         map(changes => changes.map(a => {
           const data = a.payload.doc.data() as Forum;
           return [data,a.payload.doc.id];         
          }))
       );
      }

      // Get topics which were made by a certain csi
    getCSITopic(csiName: string): any{
      return this.afs.collection('Forum',ref => ref.where('csi', '==', '' + csiName))
       .snapshotChanges().pipe(
         map(changes => changes.map(a => {
           const data = a.payload.doc.data() as Forum;
           return [data,a.payload.doc.id];
         }))
       );
      }

}
