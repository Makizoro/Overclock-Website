import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CsiService} from '../services/csi.service'

@Component({
  selector: 'app-csi-tabs',
  templateUrl: './csi-tabs.component.html',
  styleUrls: ['./csi-tabs.component.css']
})
export class CsiTabsComponent implements OnInit {

  data: any = {};

  // The constructor needs to retrieve all CSI names and descriptions. Then, add a div which has the CSI names and descriptions with
  // an onClick method that navigates to the csiPage (CSI profile page) with the csi name as a route parameter
  // TODO: Pull all CSI names and descriptions and store them in data in the following format:
  //  data: { csi: {name, description}, societies: {name, description}, interestGroups: {name, description}}
  constructor(private csiService: CsiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.csiService.getCSI().subscribe(csi => {
      this.data = csi;
      console.log(this.data);
      this.displayCSIData(this.data);

    });
  }

  navigateToCSI: EventListener = (e) => {
    console.log(e);
    const temp = e.composedPath()[1] as HTMLDivElement;
    const csiName = temp.id;
    console.log(csiName);
    this.router.navigate(['/sidebar', {outlets: {routerSidebar: 'csiPage/' + csiName}}]);

  }

  displayCSIData(data): void{
    const c = document.getElementById('clubList');
    const s = document.getElementById('societyList');
    const ig = document.getElementById('interestGroupList');

    for (const e of data){
      const newDiv = document.createElement('div');
      newDiv.id = (e.name);
      const csiTitle = document.createElement('h5');
      csiTitle.innerHTML = e.name;
      csiTitle.addEventListener('click', this.navigateToCSI);
      newDiv.appendChild(csiTitle);
      const csiDescription = document.createElement('p');
      csiDescription.innerHTML = e.description;
      csiDescription.addEventListener('click', this.navigateToCSI);
      newDiv.appendChild(csiDescription);
      switch (e.type){
        case 'Club': {
          c.appendChild(newDiv);
          break;
        }
        case 'Society': {
          s.appendChild(newDiv);
          break;
        }
        case 'InterestGroup': {
          ig.appendChild(newDiv);
          break;
        }
      }
    }
  }
}
