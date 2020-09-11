import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {Person} from '../entities/person.model';
import {AuthService} from '../services/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  exportAs: 'ngForm'
})
export class RegisterComponent implements OnInit {

  personForm: Person;
  user: firebase.User;

  constructor(private fb:AuthService) {
  }

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

  async signup(regForm: NgForm): Promise<void> {

    const u = regForm.value.username;
    const e = regForm.value.email;
    const p = regForm.value.password;
    const p2 = regForm.value.confirmPassword;
    
    if (u === '' || p === '' || p2 === '') {
      alert('Please complete any missing details');
    } else if (p !== p2) {
      alert('Passwords do not match!');
    } else {
      this.personForm = {
        username: u,
        email: e,
        password: p,
        csiName: 'none',
        type: 'User'
      };
      this.fb.register(e,p,this.personForm);
    }
  }

}
