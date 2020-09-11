import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Person } from '../entities/person.model';
import { Observable } from 'rxjs';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  person: Person;

  constructor(private personService: PersonService) {
  }

  ngOnInit(): void {
    this.personService.getPerson().subscribe(person =>
      {
        document.getElementById('username').innerHTML = person.username;
        document.getElementById('email').innerHTML = person.email;
        document.getElementById('password').innerHTML = person.password;
      });
  }

  /*async retrieve(){
    this.afAuth.auth.currentUser.uid;
    this.personDoc = this.afs.doc<Person>('Person/${uId}');

    this.personDoc.ref.get
  }

  async retrive(){
    let uId = this.afAuth.auth.currentUser.uid;

    this.personDoc = this.afs.doc(`Person/${uId}`);

    console.log(this.personDoc);





    /*(function(doc)
    {
      if(doc.exists){
        let d = doc.get();
        let u = document.getElementById("username").innerHTML ="";
        let e = document.getElementById("email").innerHTML = "New tdext!";
        let p = document.getElementById("password").innerHTML = "New tdext!";
        console.log(d);
      }else{
        console.error('No data')
      }
    });*/

  }


