import {Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CsiService} from '../services/csi.service';
import {CsiEventComponent} from '../csi-event/csi-event.component';
import {SubscriptionService} from '../services/subscription.service';
import {CookieService} from 'ngx-cookie-service';
import {Subscription} from '../entities/subscription.model';
import {CsiForumComponent} from '../csi-forum/csi-forum.component';
import {CsiForumTopicComponent} from '../csi-forum-topic/csi-forum-topic.component';
import {CsiForumCreateTopicComponent} from '../csi-forum-create-topic/csi-forum-create-topic.component';
import {CsiEventDetailsComponent} from '../csi-event-details/csi-event-details.component';

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
  @ViewChild(CsiForumComponent)
  private csiForumComponent: CsiForumComponent;
  @ViewChild(CsiEventComponent)
  private csiEventComponent: CsiEventComponent;

  // TODO: Retrieve all topics and messages from a particular CSI and store them in forumData
  // TODO: Retrieve all event data for a particular CSI and store them in eventData
  constructor(private router: Router,
              private route: ActivatedRoute,
              private csiService: CsiService,
              private subscriptionService: SubscriptionService,
              private cookieService: CookieService) {  }

  ngOnInit(): void {
    // initialises the buttons to not be displayed until the type of user is established
    const btnSub = document.getElementById('btnSubscribe');
    btnSub.style.display = 'none';
    btnSub.style.outline = 'none';
    btnSub.innerHTML = '...';
    const btnEdit = document.getElementById('btnEdit');
    btnEdit.style.display = 'none';
    btnEdit.style.outline = 'none';
    const btnManageSubs = document.getElementById('btnManageSubscriptions');
    btnManageSubs.style.display = 'none';
    btnManageSubs.style.outline = 'none';

    if (this.cookieService.check('isOwner')){
      this.updateCsiPage(this.cookieService.get('csiName'), 'null');
    }
  }

  public async updateCsiPage(name: string, myDiv: string): Promise<void>{
    if (myDiv !== 'null'){
      const popup = document.getElementById(myDiv);
      popup.style.display = 'none';
    }
    this.csiData.name = name;
    const btnSub = document.getElementById('btnSubscribe');
    btnSub.style.display = 'none';
    const btnEdit = document.getElementById('btnEdit');
    const btnManageSubs = document.getElementById('btnManageSubscriptions');

    const appCsiEvent = document.getElementById('app-csi-event-details');
    appCsiEvent.style.display = 'none';


    this.csiService.getACSI(name).subscribe(async csi => {
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
          btnSub.style.display = 'none';
        } else {
          btnEdit.style.display = 'none';
          btnManageSubs.style.display = 'none';
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
      }
      await this.csiForumComponent.updateComponent(this.csiData.name);
      await this.csiEventComponent.updateComponent(this.csiData.name);
      if (myDiv !== 'null'){
        const popup = document.getElementById(myDiv);
        popup.style.display = 'block';
      }
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

  popupClose(): void{
    // const csiPageCancel = document.getElementById('cancels');
    // csiPageCancel.click();
    const csiTabPage = document.getElementById('popupCSIpage');
    const welcomePage = document.getElementById('app-csi-page-div');

    try{
      if (csiTabPage.style.display === 'block'){
        csiTabPage.style.display = 'none';
      }
    } catch (e) {
      // will run if csi page is closed in the dashboard. This is expected behaviour and will run every time
    }
    try{
      if (welcomePage.style.display === 'block'){
        welcomePage.style.display = 'none';
      }

    } catch (e) {
      // will run if csi page is closed in csi tabs. This is expected behaviour and will run every time
    }
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
