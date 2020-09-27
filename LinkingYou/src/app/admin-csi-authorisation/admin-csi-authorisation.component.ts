import { Component, OnInit } from '@angular/core';
import {PersonService} from '../services/person.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-csi-authorisation',
  templateUrl: './admin-csi-authorisation.component.html',
  styleUrls: ['./admin-csi-authorisation.component.css']
})
export class AdminCsiAuthorisationComponent implements OnInit {

  constructor( private router: Router, private personService: PersonService, private afAuth: AuthService ) { }

  ngOnInit(): void {
    // Same comment as with submission form

    /*this.personService.getPerson(this.afAuth.userId()).subscribe(person => {
      if (person.type !== 'Admin'){
        this.router.navigateByUrl('/sidebar');
      }
    });*/
  }

}
