import {Component, OnInit, ViewChild} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {PersonService} from '../services/person.service';
import {AuthService} from '../services/auth.service';
import {SubscriptionService} from '../services/subscription.service';
import {Subscription} from '../entities/subscription.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CsiPageComponent} from '../csi-page/csi-page.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  username: string;
  uid: string;
  subList: any;
  @ViewChild(CsiPageComponent)
  private csiPageComponent: CsiPageComponent;
  constructor(
    private cookieService: CookieService,
    private personService: PersonService,
    private afAuth: AuthService,
    private subscriptionService: SubscriptionService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const popup = document.getElementById('app-csi-page-div');
    popup.style.display = 'none';
    if (this.cookieService.check('username')){
      this.username = this.cookieService.get('username');
      this.uid = this.cookieService.get('uid');
      const welcomeHeader = document.getElementById('welcomeHeader');
      welcomeHeader.innerHTML = 'Welcome back ' + this.username;
      this.retrieveSubscriptions();
    } else {
      try{
        this.personService.getPerson(this.afAuth.userId()).subscribe(person => {
          this.username = person.username;
          const welcomeHeader = document.getElementById('welcomeHeader');
          if (this.username !== null) {
            welcomeHeader.innerHTML = 'Welcome back ' + this.username;
            this.retrieveSubscriptions();
          } else {
            welcomeHeader.innerHTML = 'Welcome back';
          }
        });
      } catch (e) {
      }
    }
  }

  private retrieveSubscriptions(): void{
    this.subscriptionService.getSubList(this.uid).subscribe(subList => {
      this.subList = subList;
      this.displaySubscriptions();
    });
  }

  private displaySubscriptions(): void{
    const subDiv = document.getElementById('userSubscriptionsDiv') as HTMLDivElement;
    if (subDiv.firstChild){
      subDiv.removeChild(subDiv.firstChild);
    }

    for (const subObj of this.subList) {

      const subscription = subObj[1] as Subscription;
      const CSIheader = document.createElement('h5');
      CSIheader.innerHTML = subscription.csi;
      CSIheader.addEventListener('click', () => {
        this.navToCSI(subscription.csi);
      });
      subDiv.appendChild(CSIheader);
      const breakDiv = document.createElement('br');
      subDiv.appendChild(breakDiv);

    }
  }

  navToCSI(csi: string): void{

    console.log('works');
    const popup = document.getElementById('app-csi-page-div');
    popup.style.display = 'none';
    this.csiPageComponent.updateCsiPage(csi).then(() => {
      popup.style.display = 'block';
    });
  }
}
