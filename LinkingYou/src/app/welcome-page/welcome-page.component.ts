import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {PersonService} from '../services/person.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  username: string;
  constructor(private cookieService: CookieService, private personService: PersonService, private afAuth: AuthService) { }

  ngOnInit(): void {
    if (this.cookieService.check('username')){
      this.username = this.cookieService.get('username');
      const welcomeHeader = document.getElementById('welcomeHeader');
      welcomeHeader.innerHTML = 'Welcome back ' + this.username;
    } else {
      try{
        this.personService.getPerson(this.afAuth.userId()).subscribe(person => {
          this.username = person.name;
          const welcomeHeader = document.getElementById('welcomeHeader');
          if (this.username !== null) {
            welcomeHeader.innerHTML = 'Welcome back ' + this.username;
          } else {
            welcomeHeader.innerHTML = 'Welcome back';
          }
        });
      } catch (e) {
      }
    }
  }

}
