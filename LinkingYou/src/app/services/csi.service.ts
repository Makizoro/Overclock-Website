import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import {CSI} from '../entities/csi.model'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CsiService {
  csiCollection:AngularFirestoreCollection<CSI>;
  csi: Observable<CSI[] >;
  csiAdd: CSI;

  constructor(private afs:AngularFirestore) {
    this.csiCollection = this.afs.collection('CSI');
    this.csi = this.csiCollection.snapshotChanges().pipe(
      map(changes => changes.map(a=> {
        const data = a.payload.doc.data() as CSI;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
   }

   addCSI(name: string, type:string, description:string){
     this.csiAdd = {
       name: name,
       description: description,
       type: type,
       id: ""
     }
     
     this.csiCollection.add(this.csiAdd);

   }

   getCSI(type?: string){
     switch (type){
       case "Club":
        this.afs.collection('CSI',ref => ref.where('type','==','Club'))
        .snapshotChanges().pipe(
          map(changes => changes.map(a=> {
            const data = a.payload.doc.data() as CSI;
            data.id = a.payload.doc.id;
            return data;
          }))
        );
         break;
         case "Society":
          this.afs.collection('CSI',ref => ref.where('type','==','Society'))
          .snapshotChanges().pipe(
            map(changes => changes.map(a=> {
              const data = a.payload.doc.data() as CSI;
              data.id = a.payload.doc.id;
              return data;
            }))
          );
           break;
           case "Interest Group":
            this.afs.collection('CSI',ref => ref.where('type','==','Interest Group'))
            .snapshotChanges().pipe(
              map(changes => changes.map(a=> {
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


