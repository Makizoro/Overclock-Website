import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {CSI} from '../entities/csi.model';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CsiService {
  csiCollection: AngularFirestoreCollection<CSI>;
  csiCollectionRequest: AngularFirestoreCollection<CSI>;
  csi: Observable<CSI[] >;
  csiAdd: CSI;

  constructor(private afs: AngularFirestore, private fb: AuthService ) {
    this.csiCollection = this.afs.collection('CSI');
    this.csiCollectionRequest = this.afs.collection('CSI_Request');
    this.csi = this.csiCollection.snapshotChanges().pipe(
      map(changes => changes.map( a => {
        const data = a.payload.doc.data() as CSI;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
   }

   async addCSI(name: string, type: string, description: string){
    const uid = this.fb.userId();
    this.csiAdd = {
      name: name,
      description: description,
      type: type,
      id: uid
    };
    const docRef = this.csiCollectionRequest.ref.where('id', '==', uid)
    .where('name','==',this.csiAdd.name)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty){
          this.csiCollectionRequest.add(this.csiAdd);
          alert('Success!');
        } else {
          alert('Request already sent!');
        }
      });

   }

   getACSI(name: string): any{
   return this.afs.collection('CSI', ref => ref.where('name', '==', '' + name))
    .snapshotChanges().pipe(
      map(changes => changes.map(a => {
        const data = a.payload.doc.data() as CSI;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
   }

   getCSI(type?: string): any{
     switch (type){
       case 'Club':
        this.afs.collection('CSI', ref => ref.where('type', '==', 'Club'))
        .snapshotChanges().pipe(
          map(changes => changes.map(a => {
            const data = a.payload.doc.data() as CSI;
            data.id = a.payload.doc.id;
            return data;
          }))
        );
        break;
         case 'Society':
          this.afs.collection('CSI', ref => ref.where('type', '==', 'Society'))
          .snapshotChanges().pipe(
            map(changes => changes.map(a => {
              const data = a.payload.doc.data() as CSI;
              data.id = a.payload.doc.id;
              return data;
            }))
          );
          break;
           case 'Interest Group':
            this.afs.collection('CSI', ref => ref.where('type', '==', 'Interest Group'))
            .snapshotChanges().pipe(
              map(changes => changes.map(a => {
                const data = a.payload.doc.data() as CSI;
                data.id = a.payload.doc.id;
                return data;
              }))
            );
            break;

     }
     return this.csi;
   }

}


