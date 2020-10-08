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
    const btnSub = document.getElementById('btnSubscribe');
    btnSub.style.display = 'none';
    btnSub.style.outline = 'none';
    const btnEdit = document.getElementById('btnEdit');
    btnEdit.style.display = 'none';
    btnEdit.style.outline = 'none';
    const btnManageSubs = document.getElementById('btnManageSubscriptions');
    btnManageSubs.style.display = 'none';
    btnManageSubs.style.outline = 'none';
    this.route.params.subscribe(params => this.csiData.csiName = params.name);
    this.csiService.getACSI(this.csiData.csiName).subscribe(csi => {
      const csiName = document.getElementById('csiName');
      const csiEmail = document.getElementById('csiEmail');
      const csiDescription = document.getElementById('csiDescription');
      const csiVenue = document.getElementById('csiVenue');

      csiName.innerHTML = csi[0].name;
      csiEmail.innerHTML = csi[0].email;
      csiDescription.innerHTML = csi[0].description;
      csiVenue.innerHTML = csi[0].venue;

      if (this.cookieService.check('username')){
        this.userId = this.cookieService.get('uid');
        if (this.cookieService.get('csiName') === csi[0].name) {
          btnEdit.style.display = 'block';
          btnManageSubs.style.display = 'block';
        } else {
          btnSub.style.display = 'block';
        }
        this.subscriptionService.getCSISubRequests(this.csiData.csiName).subscribe(csiRequestList => {
          this.csiRequestList = csiRequestList;
          if (this.inList(csiRequestList, this.userId)){
            btnSub.innerHTML = 'Request Pending';
          } else {
            btnSub.innerHTML = 'Subscribe';
          }
        });
      } else {
      }

      this.router.navigate(
        [ { outlets: {routerForum: 'csiForum/' + this.csiData.csiName} } ],
        { relativeTo: this.route, skipLocationChange: true });
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

  editCSI(): void{
    this.router.navigate([{outlets: {routerSidebar: 'csiEditPage'}}], {relativeTo: this.route.parent});
  }

  manageSubs(): void{
    this.router.navigate([{outlets: {routerSidebar: 'csiSubscriptions'}}], {relativeTo: this.route.parent});
  }

  async toggleSubscribe(): Promise<void>{
    const btnSub = document.getElementById('btnSubscribe') as HTMLButtonElement;
    if (btnSub.innerHTML === 'Unsubscribe') {
      /*
      Unneeded so far
       */
    } else if (btnSub.innerHTML === 'Subscribe'){
      if (confirm('Subscribe to CSI?')){
        const subscription = {csi: this.csiData.csiName, userId: this.userId, docId: 'pending Review'} as Subscription;
        this.subscriptionService.addSubRequest(subscription).finally(() => {
        });
      } else {}
    }
  }
}
