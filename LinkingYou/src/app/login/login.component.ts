import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usrnme = 'loginData';
  loginData = {
    usrnme: ''
  };

  constructor() { }

  ngOnInit(): void {
  }


  togglePassword(): void {
    const p = document.getElementById('password') as HTMLInputElement;
    const eye = document.getElementById('eye');
    if (p.type === 'password'){
      p.type = 'text';
      eye.innerHTML = 'visibility';
    } else {
      p.type = 'password';
      eye.innerHTML = 'visibility_off';
    }
  }

  forgot(flag: boolean): void{
    const f = document.getElementById('lblForUsername') as HTMLParagraphElement;
    if (flag){
      f.style.color = 'red';
    } else {
      f.style.color = '#aaaaaa';
    }
  }

  login(): void{
    const u = document.getElementById('username') as HTMLInputElement;
    const p = document.getElementById('password') as HTMLInputElement;
    const l = document.getElementById('divLogin');
    const h = document.getElementById('appSidebar');

    const gr = [u.value, p.value];
    // let validLogin = true;

    // validate credentials here

    if (true) {
      alert('You are logged in as ' + u.value);
      l.style.display = 'none';
      this.loginData.usrnme = gr[0];
      h.style.display = 'block';
    } else {
    }

  }

}
