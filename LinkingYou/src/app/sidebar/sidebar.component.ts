import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {AuthService} from '../services/auth.service';
import {PersonService} from '../services/person.service';
// run: npm install ngx-cookie-service --save
// to use the import below
import {CookieService} from 'ngx-cookie-service';
import {WelcomePageComponent} from '../welcome-page/welcome-page.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  data: any = {};
  sideBarClick = false;
  @ViewChild(WelcomePageComponent)
  private welcomePageComponent: WelcomePageComponent;

  constructor(
    private router: Router,
    private aftAuth: AuthService ,
    private route: ActivatedRoute,
    private personService: PersonService,
    private afAuth: AuthService,
    private cookieService: CookieService
  ) {


  }

  sidebarClose(): void{
    const sidebarCancel = document.getElementById('cancel');
    this.sideBarClick = !this.sideBarClick;
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
    const csiNavLink = document.getElementById('csiAdminPage');
    if (type === 'User'){
      createCSILink.style.display = 'block';
      adminCSIFormLink.style.display = 'none';
      csiNavLink.style.display = 'none';
    } else if (type === 'Admin') {
      createCSILink.style.display = 'none';
      adminCSIFormLink.style.display = 'block';
      csiNavLink.style.display = 'none';
    } else if (type === 'CSI'){
      adminCSIFormLink.style.display = 'none';
      createCSILink.style.display = 'none';
      csiNavLink.style.display = 'block';
    }
  }

  navToCsi(): void {
    this.sidebarClose();
    this.cookieService.set('isOwner', 'true');
    this.router.navigate([{outlets: {routerSidebar: 'myCsiPage'}}], {relativeTo: this.route});
  }

  // tslint:disable-next-line:typedef
  async asyncLogout(): Promise<void> {
    await this.aftAuth.signOut().finally(() => {
      localStorage.removeItem('profile');
      localStorage.removeItem('access_token');
      this.cookieService.deleteAll('/');
      this.cookieService.deleteAll('./');
      this.router.navigateByUrl('login');
    });
  }

}


