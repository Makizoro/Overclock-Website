import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Person } from 'src/app/entities/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private firestore: AngularFirestore) { }

  getStudents(): any {
    return this.firestore.collection('PERSON').snapshotChanges();
  }

  createPerson(person: Person): any{
    return this.firestore.collection('PERSON').add(person);
  }

  deletePerson(personId: string): void{
    this.firestore.doc('PERSON/' + personId).delete();
  }

  updatePerson(person: Person): void{
    delete person.username;
    this.firestore.doc('PERSON/' + person.username).update(person);
  }
}
