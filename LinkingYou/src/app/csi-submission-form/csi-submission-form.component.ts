import { Component, OnInit } from '@angular/core';
import { CsiService } from '../services/csi.service';
import {PersonService} from '../services/person.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-csi-submission-form',
  templateUrl: './csi-submission-form.component.html',
  styleUrls: ['./csi-submission-form.component.css']
})
export class CsiSubmissionFormComponent implements OnInit {

  constructor(private csiService: CsiService, private router: Router, private personService: PersonService, private afAuth: AuthService) { }

  ngOnInit(): void {
    // commented this code out due to failing test

    this.personService.getPerson(this.afAuth.userId()).subscribe(person => {
      if (person.type !== 'User'){
        this.router.navigateByUrl('/sidebar');
      }
    });
  }

  submitForm(): void{
    const name = (document.getElementById('nameInput') as HTMLInputElement).value;
    const typeClub = (document.getElementById('typeInputClub') as HTMLInputElement).checked;
    const typeSociety = (document.getElementById('typeInputSociety') as HTMLInputElement).checked;
    const typeInterestGroup = (document.getElementById('typeInputInterestGroup') as HTMLInputElement).checked;
    let type = '';
    if (typeClub){
      type = (document.getElementById('typeInputClub') as HTMLInputElement).value;
    } else if (typeSociety){
      type = (document.getElementById('typeInputSociety') as HTMLInputElement).value;
    } else if (typeInterestGroup){
      type = (document.getElementById('typeInputInterestGroup') as HTMLInputElement).value;
    }
    const email = (document.getElementById('emailInput') as HTMLInputElement).value;
    const venue = (document.getElementById('venueInput') as HTMLInputElement).value;
    const description = (document.getElementById('descriptionInput') as HTMLInputElement).value;

    if (name === '' || type === '' || email === '' || venue === '' || description === ''){
      alert('You have not completed all fields. Please ensure that all fields are filled and checkboxes clicked');
    } else {
      this.csiService.addCSIRequest(name, type, description).finally(() => {
        this.router.navigate(['sidebar']);
      });
    }
  }

}
