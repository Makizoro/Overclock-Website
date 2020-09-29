import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Person } from 'src/app/entities/person.model';
import {ROUTES, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
   private personDoc: AngularFirestoreDocument<Person>;
   person: Observable<Person>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {

  }

  async createPerson(person: Person, router: Router, uid: string): Promise<void> {
    const docRef = this.afs.collection('Person').ref.where('email', '==', person.email)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty){
          this.afs.doc<Person>('Person/'+ uid).set(person);
          alert('Success!');
          router.navigate(['login']);
        } else {
          alert('Email already taken!');
        }
      });
    }

  getPerson(uId: string): any{
    this.personDoc = this.afs.doc<Person>('Person/' + uId);
    this.person = this.personDoc.valueChanges();
    return this.person;
  }

  // @ts-ignore
  /*async searchPerson(person: Person): boolean {

    const snapChanges = await this.firestore.collection('PERSON').ref.where('username', '==', true).get();
    console.log(snapChanges);
    if (snapChanges.empty){
      return false;
    } else {
      return true;
    }

    const docRef = this.firestore.collection('PERSON').doc(person.email);
    const doc = await docRef.get();
    console.log(doc);
    return true;
  }



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

  }*/

  deletePerson(): void{
    this.personDoc.delete();
  }

  updatePerson(person: Person): void{
    delete person.username;
    this.personDoc.update(person);
  }
}
