import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

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

  constructor(private router: Router, private afAuth: AuthService) { }


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

  async login(): Promise<void>{
    const u = document.getElementById('username') as HTMLInputElement;
    const p = document.getElementById('password') as HTMLInputElement;
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const l = document.getElementById('divLogin');
    const h = document.getElementById('appSidebar');

    const gr = [u.value, p.value];

    this.afAuth.signIn(username, password, this.loginData.usrnme = gr[0]
      , u, l , gr);
  }

}
