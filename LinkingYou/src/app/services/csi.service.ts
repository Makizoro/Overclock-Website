import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {CSI} from '../entities/csi.model';
import { Observable } from 'rxjs';
import {PersonService} from '../services/person.service';
import {AuthService} from '../services/auth.service';
import { map } from 'rxjs/operators';
import {Person} from '../entities/person.model';
@Injectable({
  providedIn: 'root'
})
export class CsiService {
  csiCollection: AngularFirestoreCollection<CSI>;
  csiCollectionRequest: AngularFirestoreCollection<CSI>;
  csi: Observable<CSI[] >;
  csiAdd: CSI;
  personService: PersonService;
  afAuth: AuthService;


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

   // For users who want to request to be a CSI owner
   async addCSIRequest(name: string, type: string, description: string, venue: string, email: string): Promise<void>{
    const uid = this.fb.userId();
    this.csiAdd = {
      name,
      description,
      type,
      email,
      venue,
      id: uid
    };
    const docRef = this.csiCollectionRequest.ref.where('id', '==', uid)
    .where('name', '==', this.csiAdd.name)
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

   // To add user request to become a CSI owner
   async addCSI(csiData: CSI, ): Promise<void>{

    const docRef = this.csiCollection.ref
    .where('name', '==', csiData.name)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty){
          this.personService.getPerson(csiData.id).subscribe((person: Person) => {
            person.csiName = csiData.name;
            person.type = 'CSI';
            this.personService.updatePerson(person);
          });
          this.csiCollection.add(this.csiAdd);
          alert('Success!');
        } else {
          alert('CSI already exists!');
        }
      });

   }

   // To fetch a csi document
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

   // to fetch all CSIs or CSIs by type
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

   // Get list of CSI requests to accept or reject
   getCSIRequests(): any{
    return this.csiCollectionRequest
     .snapshotChanges().pipe(
       map(changes => changes.map(a => {
         const data = a.payload.doc.data() as CSI;
         return [data, a.payload.doc.id];
       }))
     );
    }
    // Remove from request collection
    delete(docId: string): void{
      this.afs.doc<CSI>('CSI_Request/' + docId).delete();
    }

}


