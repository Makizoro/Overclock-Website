import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Person } from 'src/app/entities/person.model';
import {ROUTES, Router} from '@angular/router';

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
    const docRef = this.firestore.collection('PERSON').doc(person.email);
    const doc = await docRef.get();
    console.log(doc);
    return true;
  }

   async createPerson(person: Person, router: Router): Promise<void> {
    const docRef = this.firestore.collection('PERSON').ref.where('email', '==', person.email)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty){
          this.firestore.collection('PERSON').add(person);
          alert('Success!');
          router.navigate(['login']);
        } else {
          alert('Email already taken!');
        }
      });
    /*
    docRef.then(doc => {

      console.log(doc.data());
      if (!doc.exists){
        this.firestore.collection('PERSON').doc(person.email).set(person);
        alert('Success!');
        router.navigate(['login']);
      } else {
        alert('Email already taken!');
      }
    });
     */
  }

  deletePerson(personId: string): void{
    this.firestore.doc('PERSON/' + personId).delete();
  }

  updatePerson(person: Person): void{
    delete person.username;
    this.firestore.doc('PERSON/' + person.email).update(person);
  }
}
