import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Person } from 'src/app/entities/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private firestore: AngularFirestore) { }

  getPerson(): any {
    return this.firestore.collection('PERSON').snapshotChanges();
  }

  // @ts-ignore
  async searchPerson(person: Person): boolean {
    /*
    const snapChanges = await this.firestore.collection('PERSON').ref.where('username', '==', true).get();
    console.log(snapChanges);
    if (snapChanges.empty){
      return false;
    } else {
      return true;
    }
    */
    const docRef = this.firestore.collection('PERSON').doc(person.username);
    const doc = await docRef.get();
    console.log(doc);
    return true;
  }

  createPerson(person: Person): any{
    return this.firestore.collection('PERSON').doc(person.username).set(person);
    // return this.firestore.collection('PERSON').add(person);
  }

  deletePerson(personId: string): void{
    this.firestore.doc('PERSON/' + personId).delete();
  }

  updatePerson(person: Person): void{
    delete person.username;
    this.firestore.doc('PERSON/' + person.username).update(person);
  }
}
