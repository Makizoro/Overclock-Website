import { Component, OnInit } from '@angular/core';
import {CsiService} from '../services/csi.service'


@Component({
  selector: 'app-csi-submission-form',
  templateUrl: './csi-submission-form.component.html',
  styleUrls: ['./csi-submission-form.component.css']
})
export class CsiSubmissionFormComponent implements OnInit {

  constructor(private csiService: CsiService) { }

  ngOnInit(): void {
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
    //const venue = (document.getElementById('venueInput') as HTMLInputElement).value;
    const description = (document.getElementById('descriptionInput') as HTMLInputElement).value;

    if (name === '' || type === '' ||/* venue === '' ||*/ description === ''){
      alert('You have not completed all fields. Please ensure that all fields are filled and checkboxes clicked');
    } else {
      this.csiService.addCSI(name, type,description);
    }
  }

}
