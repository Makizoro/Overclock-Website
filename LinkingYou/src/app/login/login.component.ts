import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {PersonService} from '../services/person.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  p = document.getElementById('password') as HTMLInputElement;
  constructor(private router: Router, private afAuth: AuthService, private cookieService: CookieService, private personService: PersonService) {
  }


  ngOnInit(): void {
    if (this.cookieService.check('uid')){
      // console.log('User exists: ' + this.cookieService.get('username') + ', type: ' + this.cookieService.get('type'));
      this.router.navigate(['sidebar']);
    }
  }


  togglePassword(): void {
    this.p = document.getElementById('password') as HTMLInputElement;
    const eye = document.getElementById('eye');
    if (this.p.type === 'password'){
      this.p.type = 'text';
      eye.innerHTML = 'visibility';
    } else {
      this.p.type = 'password';
      eye.innerHTML = 'visibility_off';
    }
  }

  forgot(flag: boolean): void{
    const f = document.getElementById('forgotPassword') as HTMLParagraphElement;
    if (flag){
      f.style.color = 'red';
    } else {
      f.style.color = '#aaaaaa';
    }
  }

  async login(): Promise<void>{
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const l = document.getElementById('divLogin');

    const gr = [email, password];

    this.afAuth.signIn(l , gr).finally(async () => {
      const uid = await this.afAuth.userId();
      await this.personService.getPerson(uid).subscribe(person => {
        this.cookieService.set('uid', uid);
        this.cookieService.set('username', person.username);
        this.cookieService.set('email', person.email);
        this.cookieService.set('password', person.password);
        this.cookieService.set('type', person.type);
        this.cookieService.set('csiName', person.csiName);
        this.router.navigateByUrl('sidebar');
      });
    });
  }

}
