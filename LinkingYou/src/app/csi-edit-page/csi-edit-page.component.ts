import { Component, OnInit } from '@angular/core';
import {CsiService} from '../services/csi.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {CSI} from '../entities/csi.model';

@Component({
  selector: 'app-csi-edit-page',
  templateUrl: './csi-edit-page.component.html',
  styleUrls: ['./csi-edit-page.component.css']
})
export class CsiEditPageComponent implements OnInit {
  csi: CSI;

  constructor(private csiService: CsiService, private route: ActivatedRoute, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    if (!this.cookieService.check('username')){
      this.router.navigate(['']);
    } else {
      this.csiService.getACSI(this.cookieService.get('csiName')).subscribe(csi => {
        this.csi = csi[0];
        this.fillFields();
      });

    }
  }

  updateCsi(): void {
    // type

    let validFields = true;
    const typeC = document.getElementById('typeInputClub') as HTMLInputElement;
    const typeS = document.getElementById('typeInputSociety') as HTMLInputElement;
    const typeIG = document.getElementById('typeInputInterestGroup') as HTMLInputElement;

    if (typeC.checked){
      this.csi.type = typeC.value;
    } else if (typeS.checked) {
      this.csi.type = typeS.value;
    } else if (typeIG.checked) {
      this.csi.type = typeIG.value;
    } else {
      validFields = false;
    }

    const emailInput = document.getElementById('emailInput') as HTMLInputElement;
    if (emailInput.value === ''){
      validFields = false;
    } else {
      this.csi.email = emailInput.value;
    }
    const venueInput = document.getElementById('venueInput') as HTMLInputElement;
    if (venueInput.value === '') {
      validFields = false;
    } else {
      this.csi.venue = venueInput.value;
    }
    const descriptionInput = document.getElementById('descriptionInput') as HTMLInputElement;
    if (descriptionInput.value === '') {
      validFields = false;
    } else {
      this.csi.description = descriptionInput.value;
    }


    if (validFields){
      this.csiService.updateCSI(this.csi);
      this.router.navigate([{outlets: {routerSidebar: 'csiPage/' + this.csi.name}}], {relativeTo: this.route.parent});
    } else {
      alert('Please ensure that all fields are filled and a CSI Type is checked');
    }

  }

  private fillFields(): void {

    const typeC = document.getElementById('typeInputClub') as HTMLInputElement;
    const typeS = document.getElementById('typeInputSociety') as HTMLInputElement;
    const typeIG = document.getElementById('typeInputInterestGroup') as HTMLInputElement;

    switch (this.csi.type){
      case ('Club'): {
        typeC.checked = true;
        break;
      }
      case ('Society'): {
        typeS.checked = true;
        break;
      }
      case ('Interest Group'): {
        typeIG.checked = true;
        break;
      }
    }
    // email
    const emailInput = document.getElementById('emailInput') as HTMLInputElement;
    emailInput.value = this.csi.email;
    const venueInput = document.getElementById('venueInput') as HTMLInputElement;
    venueInput.value = this.csi.venue;
    const descriptionInput = document.getElementById('descriptionInput') as HTMLInputElement;
    descriptionInput.value = this.csi.description;
  }
}
