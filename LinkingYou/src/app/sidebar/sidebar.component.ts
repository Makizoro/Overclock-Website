import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {AuthService} from '../services/auth.service';
import {PersonService} from '../services/person.service';
// run: npm install ngx-cookie-service --save
// to use the import below
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  data: any = {};

  constructor(
    private router: Router,
    private aftAuth: AuthService ,
    private activatedRoute: ActivatedRoute,
    private personService: PersonService,
    private afAuth: AuthService,
    private cookieService: CookieService
  ) {


  }

  sidebarClose(): void{
    const sidebarCancel = document.getElementById('cancel');
    sidebarCancel.click();
  }

  ngOnInit(): void {
    const createCSILink = document.getElementById('createCSI');
    createCSILink.style.display = 'none';
    const adminCSIFormLink = document.getElementById('adminCsiForm');
    adminCSIFormLink.style.display = 'none';

    if (this.cookieService.check('uid')){
      const gr = [this.cookieService.get('email'), this.cookieService.get('password')];
      this.unblockElements(this.cookieService.get('type'));
    } else {
        this.router.navigateByUrl('login');
    }
  }


  unblockElements(type): void{
    const createCSILink = document.getElementById('createCSI');
    const adminCSIFormLink = document.getElementById('adminCsiForm');
    if (type === 'User'){
      createCSILink.style.display = 'block';
      adminCSIFormLink.style.display = 'none';
    } else if (type === 'Admin') {
      adminCSIFormLink.style.display = 'block';
      createCSILink.style.display = 'none';
    } else {
      adminCSIFormLink.style.display = 'none';
      createCSILink.style.display = 'none';

    }
  }

  logout(): void{

    this.asynclogout();
  }

  // tslint:disable-next-line:typedef
  async asynclogout() {
    await this.aftAuth.signOut().finally(() => {
      this.cookieService.deleteAll('/');
      this.cookieService.deleteAll('./');
      this.router.navigateByUrl('login');
    });
    localStorage.removeItem('profile');
    localStorage.removeItem('access_token');
  }

}


