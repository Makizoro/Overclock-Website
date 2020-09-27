import { Component, OnInit } from '@angular/core';
import {PersonService} from '../services/person.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { CSI } from '../entities/csi.model';
import {CsiService} from '../services/csi.service';

@Component({
  selector: 'app-admin-csi-authorisation',
  templateUrl: './admin-csi-authorisation.component.html',
  styleUrls: ['./admin-csi-authorisation.component.css']
})
export class AdminCsiAuthorisationComponent implements OnInit {

  csiList: any;
  constructor(
    private router: Router,
    private personService: PersonService,
    private afAuth: AuthService,
    private csiService: CsiService
  ) { }

  ngOnInit(): void {
    // Same comment as with submission form

    /*this.personService.getPerson(this.afAuth.userId()).subscribe(person => {
      if (person.type !== 'Admin'){
        this.router.navigateByUrl('/sidebar');
      } else {
        this.csiService.getCSIRequests().subscribe(list => {
          this.csiList = list;
          console.log(this.csiList);
          this.displayCsiData(this.csiList);
        });
      }
    });*/
  }

  displayCsiData(csiList): void {
    const c = document.getElementById('clubList');
    const s = document.getElementById('societyList');
    const ig = document.getElementById('interestGroupList');

    for (const csi of csiList){

      const btnAccept = document.createElement('button');
      btnAccept.name = 'btnAccept';
      btnAccept.innerHTML = 'ACCEPT';
      btnAccept.addEventListener('click', () => {
        this.judge(true, csi);
      });
      const btnReject = document.createElement('button');
      btnReject.name = 'btnReject';
      btnReject.innerHTML = 'REJECT';
      btnReject.addEventListener('click', () => {
        this.judge(false, csi);
      });

      const newDiv = document.createElement('div');
      newDiv.id = (csi.name);
      const csiTitle = document.createElement('h5');
      csiTitle.innerHTML = csi.name;
      csiTitle.appendChild(btnAccept);
      csiTitle.appendChild(btnReject);
      newDiv.appendChild(csiTitle);
      const csiDescription = document.createElement('p');
      csiDescription.innerHTML = csi.description;
      newDiv.appendChild(csiDescription);
      switch (csi.type){
        case 'Club': {
          c.appendChild(newDiv);
          break;
        }
        case 'Society': {
          s.appendChild(newDiv);
          break;
        }
        case 'Interest Group': {
          ig.appendChild(newDiv);
          break;
        }
      }}

  }

  judge(verdict: boolean, csi: CSI): void{

    if (verdict){
      alert('Will accept ' + csi.name + ' as a CSI');
      this.csiService.addCSI(csi);
    } else {
      alert('Will reject ' + csi.name + ' as a CSI');
    }
  }

}
