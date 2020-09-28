import { Component, OnInit } from '@angular/core';
import {CsiService} from '../services/csi.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-csi-edit-page',
  templateUrl: './csi-edit-page.component.html',
  styleUrls: ['./csi-edit-page.component.css']
})
export class CsiEditPageComponent implements OnInit {
  csi: any;

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

    const typeC = document.getElementById('typeInputClub') as HTMLInputElement;
    const typeS = document.getElementById('typeInputSociety') as HTMLInputElement;
    const typeIG = document.getElementById('typeInputInterestGroup') as HTMLInputElement;

    if (typeC.checked){
      this.csi.type = typeC.value;
    } else if (typeS.checked) {
      this.csi.type = typeS.value;
    } else if (typeIG.checked) {
      this.csi.type = typeIG.value;
    }

    const emailInput = document.getElementById('emailInput') as HTMLInputElement;
    this.csi.email = emailInput.value;
    const venueInput = document.getElementById('venueInput') as HTMLInputElement;
    this.csi.venue = venueInput.value;
    const descriptionInput = document.getElementById('descriptionInput') as HTMLInputElement;
    this.csi.description = descriptionInput.value;

    console.log(this.csi);
    /*
    this.csiService.updateCSI
     */
  }

  private fillFields(): void {
    console.log(this.csi);

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
