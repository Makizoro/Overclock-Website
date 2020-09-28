import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CsiService} from '../services/csi.service';
import {CsiEventComponent} from '../csi-event/csi-event.component';
import {SubscriptionService} from '../services/subscription.service';
import {CookieService} from 'ngx-cookie-service';
import {Subscription} from '../entities/subscription.model';

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
  private csiSubList: any;
  private csiRequestList: any;
  userId: any;

  // TODO: Retrieve all topics and messages from a particular CSI and store them in forumData
  // TODO: Retrieve all event data for a particular CSI and store them in eventData
  constructor(private router: Router,
              private route: ActivatedRoute,
              private csiService: CsiService,
              private subscriptionService: SubscriptionService,
              private cookieService: CookieService) {  }

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

      if (this.cookieService.check('username')){
        this.userId = this.cookieService.get('username');
      } else {
      }
      this.subscriptionService.getCSISubList(this.csiData.name).subscribe(csiSubList => {
        this.csiSubList = csiSubList;
        console.log(this.csiSubList);
        const btnSub = document.getElementById('btnSubscribe');
        if (this.inList(csiSubList, this.userId)) {
          btnSub.innerHTML = 'Unsubscribe';
        } else {
          this.subscriptionService.getCSIRequests(this.csiData.name).subscribe(csiRequestList => {
            this.csiRequestList = csiRequestList;
            if (this.inList(csiRequestList, this.userId)){
              btnSub.innerHTML = 'Cancel Subscription Request';
            } else {
              btnSub.innerHTML = 'Subscribe';
            }
          });
        }
          });

      this.router.navigate([ { outlets: {routerForum: 'csiForum/' + this.csiData.csiName} } ], { relativeTo: this.route });
    }); // retrieve and display CSI data

  }

  private inList(csiSubList: any, userId: string): boolean {
    for (const sub of csiSubList){
      const subData = sub[1] as Subscription;
      if (subData.userId === this.userId){
        return true;
      }
    }
    return false;
  }

  async toggleSubscribe(): Promise<void>{
    const btnSub = document.getElementById('btnSubscribe') as HTMLButtonElement;
    if (btnSub.innerHTML === 'Unsubscribe') {
      /*
      const subscription = {csi: this.csiData.name, userId: this.userId, docId: 'dunno'} as Subscription;
       */
      for (const sub of this.csiSubList){
        const subData = sub[1] as Subscription;

        if (subData.userId === this.userId) {
          this.subscriptionService.delete(sub[0]);
        }
      }
    } else if (btnSub.innerHTML === 'Subscribe'){
      /*
      const subscription = {csi: this.csiData.name, userId: this.userId, docId: 'dunno'} as Subscription;
      this.subscriptionService.addSubRequest(subscription);
       */
    } else {
      for (const sub of this.csiRequestList){
        const subData = sub[1] as Subscription;

        if (subData.userId === this.userId) {
          this.subscriptionService.delete(sub[0]);
        }
      }

    }
  }
}
