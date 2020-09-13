import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CsiService} from '../services/csi.service';
import {CSI} from '../entities/csi.model';

@Component({
  selector: 'app-csi-page',
  templateUrl: './csi-page.component.html',
  styleUrls: ['./csi-page.component.css']
})
export class CsiPageComponent implements OnInit {

  data: any = {};
  routeState: any;

  // this.data.csiName will contain the CSI name that must have its data pulled and displayed
  // TODO: pull data of CSI from Firebase and store in this.data.csiData
  constructor(private route: ActivatedRoute, private csiService: CsiService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.data.csiName = params.name);
    const thisCSI = this.csiService.getACSI(this.data.csiName).subscribe(csi => {
      const csiName = document.getElementById('csiName');
      const csiEmail = document.getElementById('csiEmail');
      const csiDescription = document.getElementById('csiDescription');
      const csiVenue = document.getElementById('csiVenue');

      csiName.innerHTML = csi[0].name;
      csiDescription.innerHTML = csi[0].description;
    });
  }

}
