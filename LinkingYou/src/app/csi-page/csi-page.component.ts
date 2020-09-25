import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CsiService} from '../services/csi.service';

@Component({
  selector: 'app-csi-page',
  templateUrl: './csi-page.component.html',
  styleUrls: ['./csi-page.component.css']
})
export class CsiPageComponent implements OnInit {

  csiData: any = {};
  forumData: any = {};
  eventData: any = {};
  routeState: any;

  // TODO: Retrieve all topics and messages from a particular CSI and store them in forumData
  // TODO: Retrieve all event data for a particular CSI and store them in eventData
  constructor(private router: Router, private route: ActivatedRoute, private csiService: CsiService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.csiData.csiName = params.name);
    const thisCSI = this.csiService.getACSI(this.csiData.csiName).subscribe(csi => {
      const csiName = document.getElementById('csiName');
      const csiEmail = document.getElementById('csiEmail');
      const csiDescription = document.getElementById('csiDescription');
      const csiVenue = document.getElementById('csiVenue');

      csiName.innerHTML = csi[0].name;
      csiEmail.innerHTML = csi[0].email;
      csiDescription.innerHTML = csi[0].description;
      csiVenue.innerHTML = csi[0].venue;

      this.router.navigate([ { outlets: {routerForum: 'csiForum/' + this.csiData.csiName} } ], { relativeTo: this.route });
    }); // retrieve and display CSI data

  }

}
