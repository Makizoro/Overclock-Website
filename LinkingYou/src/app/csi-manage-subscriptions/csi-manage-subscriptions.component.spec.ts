import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CsiManageSubscriptionsComponent } from './csi-manage-subscriptions.component';
import {DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import {AuthService} from '../services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';
import { AppRouteModule } from '../app.route';
import { PersonService } from '../services/person.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Subscription } from '../entities/subscription.model';
import { SubscriptionService } from '../services/subscription.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CSI } from '../entities/csi.model';
import { Person } from '../entities/person.model';

describe('CsiManageSubscriptionsComponent', () => {
  let component: CsiManageSubscriptionsComponent;
  let fixture: ComponentFixture<CsiManageSubscriptionsComponent>;
  let servicePerson: PersonService;
  let serviceR: Router;
  let serviceSub: SubscriptionService;
  let serviceCookie: CookieService;
  let csi: CSI;
  let person: Person;
  let sub: Subscription;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule,
        RouterTestingModule
      ],
      providers: [ CookieService, SubscriptionService, PersonService],
      declarations: [ CsiManageSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiManageSubscriptionsComponent);
    component = fixture.componentInstance;

    serviceR = TestBed.inject(Router);
    serviceSub = TestBed.inject(SubscriptionService);
    servicePerson = TestBed.inject(PersonService);
    serviceCookie = TestBed.inject(CookieService);

    csi = {
      name: 'clubName',
      description: 'clubDescription', 
      type: 'Club',
      id: 'id',
      venue: 'clubVenue',
      email: 'clubEmail'
    };

    person = {
      username: 'testPerson',
      email: 'person@test.com',
      password: '123456',
      csiName: 'None',
      type: 'User'
    };

    sub = {
      csi: 'csiName',
      userId: 'userId',
      docId: 'docId'
    };

  });

  it('should initiate', () => {
    const spy = spyOn(serviceCookie, 'check').and.returnValue(false);
    spyOn(serviceR, 'navigate');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should initiate else if', () => {
    const spy = spyOn(serviceCookie, 'check').and.returnValue(true);
    spyOn(serviceCookie, 'get').and.returnValue('none');
    spyOn(serviceR, 'navigate');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

it('should initiate else', () => {
    const spy = spyOn(serviceCookie, 'check').and.returnValue(true);
    spyOn(serviceCookie, 'get').and.returnValue(csi.name);
    spyOn(serviceR, 'navigate');
    spyOn(serviceSub, 'getCSISubRequests').and.returnValue(of([[sub, sub.docId]]));
    spyOn(servicePerson, 'getPerson').and.returnValue(of([person]));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should accept', () => {
    const spy = spyOn(serviceSub, 'addSubscription').and.returnValue(Promise.resolve());
    spyOn(serviceSub, 'delete').and.returnValue(Promise.resolve());
    spyOn(serviceSub, 'getCSISubRequests').and.returnValue(of([[sub, sub.docId]]));

    const requestDiv = document.createElement('div');
    requestDiv.id = 'rd' + person.username;
    const subManageDiv = document.getElementById('subManageDiv') as HTMLDivElement;
    subManageDiv.appendChild(requestDiv);
  
    component.acceptRequest(sub, sub.docId, person.username);
    expect(spy).toHaveBeenCalled();
  });

  it('should reject',(() => {
    const spy = spyOn(serviceSub, 'delete');
    spyOn(serviceSub, 'getCSISubRequests').and.returnValue(of([[sub, sub.docId]]));

    const requestDiv = document.createElement('div');
    requestDiv.id = 'rd' + person.username;
    const subManageDiv = document.getElementById('subManageDiv') as HTMLDivElement;
    subManageDiv.appendChild(requestDiv);

    component.rejectRequest(sub, sub.docId, person.username);

    expect(spy).toHaveBeenCalled();
  }));
  
});
