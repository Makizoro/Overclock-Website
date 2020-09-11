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


      async signIn(email: string, password: string){
        
        return this.afAuth.auth.signInWithEmailAndPassword(email,password).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          
        });
        
      }

      async register(e: string,p: string, personForm: Person){
        this.afAuth.auth.createUserWithEmailAndPassword(e,p).then(cred =>
          {
            const uId = cred.user.uid
            const userRef: AngularFirestoreDocument<Person> = this.afs.doc(`Person/${uId}`);
            this.fb.createPerson(personForm, this.router, uId);
          });
      }

      userId(){
        if(this.user$ != null){
          return this.uId;
        }else{
          return null;
        }
        
      }

      async signOut(){
        this.afAuth.auth.signOut;
        return this.router.navigate(['/']);
      }
      // to remove user account
      /*async deleteAcc(){

        this.afAuth.
        return this.router.navigate(['/']);

      }*/

  }

