import { Component, OnInit } from '@angular/core';
import {PersonService} from '../services/person.service';
import {AuthService} from '../services/auth.service';
import {CsiService} from '../services/csi.service';
import {Router} from '@angular/router';
import { CSI } from '../entities/csi.model';
import {CookieService} from 'ngx-cookie-service';

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
    private csiService: CsiService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.retrieveForms();
  }

  private retrieveForms(): void{

    if (this.cookieService.get('type') !== 'Admin'){
      this.router.navigateByUrl('/sidebar');
    } else {
      this.csiService.getCSIRequests().subscribe(list => {
        this.csiList = list;
        this.displayCsiData(this.csiList);
      });
    }
  }

  private displayCsiData(csiList): void {
    const c = document.getElementById('clubList');
    while (c.firstChild) {
      c.removeChild(c.firstChild);
    }
    const s = document.getElementById('societyList');
    while (s.firstChild) {
      s.removeChild(s.firstChild);
    }
    const ig = document.getElementById('interestGroupList');
    while (ig.firstChild) {
      ig.removeChild(ig.firstChild);
    }

    for (const csi of csiList){
      const csiData = csi[0] as CSI;

      const btnAccept = document.createElement('button');
      btnAccept.innerHTML = 'ACCEPT';
      btnAccept.style.paddingRight = '20px';
      btnAccept.style.borderRadius = '25px';
      btnAccept.addEventListener('click', () => {
        this.judge(true, csi);
      });
      const btnReject = document.createElement('button');
      btnReject.innerHTML = 'REJECT';
      btnReject.style.paddingRight = '20px';
      btnReject.style.borderRadius = '25px';
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
      }
    }

    if (!c.firstChild){

      const tempHeader = document.createElement('h4');
      tempHeader.innerHTML = 'No Club forms';
      c.appendChild(tempHeader);
    }
    if (!s.firstChild){

      const tempHeader = document.createElement('h4');
      tempHeader.innerHTML = 'No Society forms';
      s.appendChild(tempHeader);
    }
    if (!ig.firstChild){

      const tempHeader = document.createElement('h4');
      tempHeader.innerHTML = 'No Interest Group forms';
      ig.appendChild(tempHeader);
    }
  }

  judge(verdict: boolean, csi): void{

    const csiData = csi[0];
    const csiId = csi[1];
    const csiDiv = document.getElementById(csiData.name);

    if (verdict){
      alert('Will accept ' + csiData.name + ' as a CSI');
      this.csiService.addCSI(csiData).finally(() => {
        this.csiService.delete(csiId).finally(() => {
          csiDiv.remove();
          this.retrieveForms();
        });
      });
    } else {
      alert('Will reject ' + csiData.name + ' as a CSI');
      this.csiService.delete(csiId).finally(() => {
        csiDiv.remove();
        this.retrieveForms();
      });
    }
  }

}
