import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {CsiService} from '../services/csi.service';
import {SubscriptionService} from '../services/subscription.service';
import {Subscription} from '../entities/subscription.model';
import {PersonService} from '../services/person.service';
import {Person} from '../entities/person.model';

@Component({
  selector: 'app-csi-manage-subscriptions',
  templateUrl: './csi-manage-subscriptions.component.html',
  styleUrls: ['./csi-manage-subscriptions.component.css']
})
export class CsiManageSubscriptionsComponent implements OnInit {

  csiSubList: any;
  csiName: string;
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute,
    private csiService: CsiService,
    private subscriptionService: SubscriptionService,
    private personService: PersonService) { }

  ngOnInit(): void {
    if (!this.cookieService.check('csiName')){
      this.router.navigate(['sidebar']);
    } else if (this.cookieService.get('csiName') === 'none') {
      this.router.navigate(['sidebar']);
    } else {
      this.csiName = this.cookieService.get('csiName');
      this.retrieveCsiList();

    }

  }

  private retrieveCsiList(): void {
    this.subscriptionService.getCSISubRequests(this.csiName).subscribe(csiSubList => {
      this.csiSubList = csiSubList;

      this.displaySubList();
    });
  }

  private async displaySubList(): Promise<void> {
    const subManageDiv = document.getElementById('subManageDiv') as HTMLDivElement;
    if (subManageDiv.firstChild) {
      subManageDiv.removeChild(subManageDiv.firstChild);
    }

    for (const csiRequestObj of this.csiSubList) {
      const csiRequest = csiRequestObj[1] as Subscription;
      const csiRequestId = csiRequestObj[1].docId;

      const requestDiv = document.createElement('div');
      const personNameHeader = document.createElement('h5');
      const btnAccept = document.createElement('button');
      btnAccept.innerHTML = 'ACCEPT';
      btnAccept.addEventListener('click', () => {
        this.acceptRequest(csiRequest, csiRequestId);
      });
      const btnReject = document.createElement('button');
      btnReject.innerHTML = 'REJECT';
      btnReject.addEventListener('click', () => {
        this.rejectRequest(csiRequest, csiRequestId);
      });

      await this.personService.getPerson(csiRequest.userId).subscribe((person: Person) => {
        personNameHeader.innerHTML = person.username;
        requestDiv.appendChild(personNameHeader);
        requestDiv.appendChild(btnAccept);
        requestDiv.appendChild(btnReject);
        const breakDiv = document.createElement('br');
        requestDiv.appendChild(breakDiv);
        requestDiv.appendChild(breakDiv);
        subManageDiv.appendChild(requestDiv);
      });
    }
  }

  acceptRequest(subscription: Subscription, docId: string): void {
    this.subscriptionService.addSubscription(subscription);
    this.subscriptionService.delete(docId);
    this.retrieveCsiList();
  }

  rejectRequest(subscription: Subscription, docId: string): void {
    this.subscriptionService.delete(docId);
    this.retrieveCsiList();
  }
}
