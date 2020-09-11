import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

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

  constructor(private router: Router, private afAuth:AngularFireAuth) { }
  

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

  valid(valid: boolean,u: { value: string; },l: { style: { display: string; }; },gr: string[]): void{
    alert('You are logged in as ' + u.value);
      l.style.display = 'none';
      this.loginData.usrnme = gr[0];
      this.router.navigateByUrl('/sidebar', {state: {username: u.value}});
  }


  async login(){
    const u = document.getElementById('username') as HTMLInputElement;
    const p = document.getElementById('password') as HTMLInputElement;
    let username = (document.getElementById('username') as HTMLInputElement).value;
    let password = (document.getElementById('password') as HTMLInputElement).value;
    const l = document.getElementById('divLogin');
    const h = document.getElementById('appSidebar');

    const gr = [u.value, p.value];
    // validate credentials here 
    // will move sigin and register to auth service
    this.afAuth.auth.signInWithEmailAndPassword(username,password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      
    }).then(user => 
      this.valid(true,u, l ,gr), err => alert(err.message)
      ); 
  }

}
