import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {Person} from '../entities/person.model';
import {PersonService} from '../services/person.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  exportAs: 'ngForm'
})
export class RegisterComponent implements OnInit {

  personForm: Person;

  constructor(private fb: PersonService) { }

  ngOnInit(): void {
  }

  togglePassword(): void {
    const p = document.getElementById('password') as HTMLInputElement;
    const p2 =  document.getElementById('confirmPassword') as HTMLInputElement;
    const eye = document.getElementById('eye');
    if (p.type === 'password'){
      p.type = 'text';
      p2.type = 'text';
      eye.innerHTML = 'visibility';
    } else {
      p.type = 'password';
      p2.type = 'password';
      eye.innerHTML = 'visibility_off';
    }
  }

  signup(regForm: NgForm): void{
    const u = document.getElementById('username') as HTMLInputElement;
    const p = document.getElementById('password') as HTMLInputElement;
    const p2 = document.getElementById('confirmPassword') as HTMLInputElement;

    if (u.value === '' || p.value === '' || p2.value === ''){
      alert('Please complete any missing details');
    } else if (p.value !== p2.value) {
      alert('Passwords do not match!');
    } else {
        this.fb.createPerson(this.personForm);
        alert('Success!');
    }
  }

}
