import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { from } from 'rxjs';

import { WelcomePageComponent } from './welcome-page.component';
import { Router, Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';
import { AppRouteModule } from '../app.route';
import { AuthService } from '../services/auth.service';
import { PersonService } from '../services/person.service';
import { Person } from '../entities/person.model';
import { SubscriptionService } from '../services/subscription.service';
import { Subscription } from '../entities/subscription.model';
import { CookieService } from 'ngx-cookie-service';

describe('WelcomePageComponent', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;
  let de: DebugElement;
  let spy: jasmine.Spy;
  let spyPerson: jasmine.Spy;
  let spyAuth: jasmine.Spy;
  let spySub: jasmine.Spy;
  let spyCookie: jasmine.Spy;
  let service: Router;
  let serviceAuth: AuthService;
  let servicePerson: PersonService;
  let serviceSub: SubscriptionService;
  let serviceCookie: CookieService;
  let sub: Subscription;
  let person,personNull: Person;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase  ),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule,
        RouterTestingModule
      ],
      providers: [ AuthService, PersonService, SubscriptionService, CookieService ],
      declarations: [ WelcomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePageComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    service = TestBed.inject(Router);
    servicePerson = TestBed.inject(PersonService);
    serviceAuth = TestBed.inject(AuthService);
    serviceSub = TestBed.inject(SubscriptionService);
    serviceCookie = TestBed.inject(CookieService);
    //fixture.ngZone.run(() => router.navigate());

    person = {
      username: 'testPerson',
      email: 'person@test.com',
      password: '123456',
      csiName: 'None',
      type: 'User'
    };
    personNull = {
      username: null,
      email: 'person@test.com',
      password: '123456',
      csiName: 'None',
      type: 'User'
    };

    sub = {
      csi: 'csiTest',
      userId:'userIdTest',
      docId: 'docIdTest'
    };

    spyAuth = spyOn(serviceAuth, 'userId').and.returnValue(of('userId'));

    fixture.detectChanges();
  });

  /*it('should nav with csi', fakeAsync(() => {
    component.navToCSI('dave');
    expect(spy).toHaveBeenCalled();
  }));*/

  it('should display subs if', fakeAsync(() => {
    spyPerson = spyOn(servicePerson, 'getPerson').and.returnValue(of([person]));
    spySub = spyOn(serviceSub, 'getSubList').and.returnValue(of([[sub,sub]]));
    spyCookie = spyOn(serviceCookie,'check').and.returnValue(true);
    spy = spyOn(service, 'navigate');

    spyOn(serviceCookie,'get').and.returnValue('username/userId test');
    component.ngOnInit();
    tick(500);
    fixture.detectChanges();
    expect(spySub).toHaveBeenCalled();
  }));

  it('should display subs else', fakeAsync(() => {
    spyCookie = spyOn(serviceCookie,'check').and.returnValue(false);
    spyPerson = spyOn(servicePerson, 'getPerson').and.returnValue(of([personNull]));
    spy = spyOn(service, 'navigate');

    component.ngOnInit();
    tick(500);
    expect(spyPerson).toHaveBeenCalled();
  }));

});
