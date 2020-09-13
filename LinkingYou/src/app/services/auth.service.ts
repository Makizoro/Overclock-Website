import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Person } from '../entities/person.model';
import { async } from '@angular/core/testing';
import { PersonService } from './person.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<Person>;
  uId: string;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private fb: PersonService,
    private router: Router
  ) {

    this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
            // Logged in
          if (user) {
            this.uId = this.uId;
            return this.afs.doc<Person>(`users/${user.uid}`).valueChanges();
          } else {
            // Logged out
            return of(null);
          }
        })
      );
  }

  valid(  l: { style: { display: string; }; }, gr: string[]): void{
    alert('You are logged in as ' + gr[0]);
    l.style.display = 'none';
    this.router.navigateByUrl('/sidebar', {state: {username: gr[0]}});
  }

      async signIn(l: { style: { display: string; }; }, gr: string[]): Promise<void>{

        return this.afAuth.auth.signInWithEmailAndPassword(gr[0], gr[1]).then(user =>
          this.valid( l , gr)
          ).catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);

        });

      }

      async register(e: string, p: string, personForm: Person): Promise<void>{
        this.afAuth.auth.createUserWithEmailAndPassword(e, p).then(cred =>
          {
            const uId = cred.user.uid;
            const userRef: AngularFirestoreDocument<Person> = this.afs.doc(`Person/${uId}`);
            this.fb.createPerson(personForm, this.router, uId);
          }).catch(error => {
            // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              alert(errorMessage);
            }
          console.log(error);
          });
      }

      userId(): any{
        return this.afAuth.auth.currentUser.uid;
      }

      async signOut(): Promise<void>{
        this.afAuth.auth.signOut();
        this.router.navigate(['/']);
      }
      // to remove user
      /*async deleteAcc(){

        this.afAuth.
        return this.router.navigate(['/']);

      }*/

  }

