import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Person } from '../entities/person.model';
import { PersonService } from '../services/person.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  person: Person;

  constructor(private personService: PersonService, private afAuth: AuthService) {
  }

  ngOnInit(): void {
    this.personService.getPerson(this.afAuth.userId()).subscribe(person =>
      {
        console.log(person);
        document.getElementById('username').innerHTML = person.username;
        document.getElementById('email').innerHTML = person.email;
      });
  }

  }


