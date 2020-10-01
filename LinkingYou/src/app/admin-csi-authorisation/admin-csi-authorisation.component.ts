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

    this.personService.getPerson(this.afAuth.userId()).subscribe(person => {
      if (person.type !== 'Admin'){
        this.router.navigateByUrl('/sidebar');
      } else {
        this.csiService.getCSIRequests().subscribe(list => {
          this.csiList = list;
          this.displayCsiData(this.csiList);
        });
      }
    });
  }

  displayCsiData(csiList): void {
    const c = document.getElementById('clubList');
    const s = document.getElementById('societyList');
    const ig = document.getElementById('interestGroupList');

    for (const csi of csiList){
      const csiData = csi[0] as CSI;

      const btnAccept = document.createElement('button');
      btnAccept.name = 'btnAccept';
      btnAccept.className = 'mystyle';
      btnAccept.innerHTML = 'ACCEPT';
      btnAccept.addEventListener('click', () => {
        this.judge(true, csi);
      });
      const btnReject = document.createElement('button');
      btnReject.name = 'btnReject';
      btnReject.className = 'mystyle';
      btnReject.innerHTML = 'REJECT';
      btnReject.addEventListener('click', () => {
        this.judge(false, csi);
      });

      const newDiv = document.createElement('div') as HTMLDivElement;
      newDiv.id = (csiData.name);
      const csiTitle = document.createElement('h5');
      csiTitle.innerHTML = csiData.name;
      const breakDiv = document.createElement('br');
      csiTitle.appendChild(breakDiv);
      csiTitle.appendChild(btnAccept);
      csiTitle.appendChild(btnReject);
      newDiv.appendChild(csiTitle);
      const csiDescription = document.createElement('p');
      csiDescription.innerHTML = csiData.description;
      newDiv.appendChild(csiDescription);
      switch (csiData.type){
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

  judge(verdict: boolean, csi): void{

    const csiData = csi[0];
    const csiId = csi[1];
    const csiDiv = document.getElementById(csiData.name);

    if (verdict){
      alert('Will accept ' + csiData.name + ' as a CSI');
      this.csiService.addCSI(csiData);
      this.csiService.delete(csiId);
      csiDiv.remove();
    } else {
      alert('Will reject ' + csiData.name + ' as a CSI');
      csiDiv.remove();
      this.csiService.delete(csiId);
    }
  }

}
