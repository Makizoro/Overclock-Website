import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
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
  constructor(private csiService: CsiService) { }

  ngOnInit(): void {
    
    this.csiService.getCSI().subscribe(csi =>{
    
      this.data = csi;
      console.log(this.data);
    });

  }
}
