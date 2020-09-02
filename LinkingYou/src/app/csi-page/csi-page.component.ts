import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

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
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.data.csiName = params.name);
  }

  ngOnInit(): void {
  }

}
