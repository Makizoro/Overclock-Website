import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {AuthService} from '../services/auth.service';
import {PersonService} from '../services/person.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  data: any = {};

  constructor(
    private router: Router,
    private aftAuth: AngularFireAuth ,
    private activatedRoute: ActivatedRoute,
    private personService: PersonService,
    private afAuth: AuthService
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
    try {
      this.personService.getPerson(this.afAuth.userId()).subscribe(person => {
        this.data.username = person.username;
        if (person.type === 'User'){
          createCSILink.style.display = 'block';
        } else if (person.type === 'admin') {
          adminCSIFormLink.style.display = 'block'
        }
      });
    } catch (e) {
      this.router.navigateByUrl('/login');
    }
  }

  // tslint:disable-next-line:typedef
  async logout() {
    this.aftAuth.auth.signOut();
    localStorage.removeItem('profile');
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/login');
  }

}


