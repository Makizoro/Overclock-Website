import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiPageComponent } from './csi-page.component';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';
import { AppRouteModule } from '../app.route';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from '../services/subscription.service';
import { CsiService } from '../services/csi.service';
import { CookieService } from 'ngx-cookie-service';
import { RouterTestingModule } from '@angular/router/testing';
import { CSI } from '../entities/csi.model';
import { Subscription } from '../entities/subscription.model';

describe('CsiPageComponent', () => {
  let component: CsiPageComponent;
  let fixture: ComponentFixture<CsiPageComponent>;
  let serviceR: Router;
  let serviceSub: SubscriptionService;
  let serviceCSI: CsiService
  let serviceCookie: CookieService;
  let serviceAct: ActivatedRoute;
  let csi: CSI;
  let sub: Subscription;
  

  beforeEach(async(() => {
    csi = {
      name: 'clubName',
      description: 'clubDescription', 
      type: 'Club',
      id: 'id',
      venue: 'clubVenue',
      email: 'clubEmail'
    };

    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule,
        RouterTestingModule
      ],
      providers: [ CsiService, SubscriptionService, CookieService ],
      declarations: [ CsiPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiPageComponent);
    component = fixture.componentInstance;

    serviceCookie = TestBed.inject(CookieService);
    serviceR = TestBed.inject(Router);
    serviceSub = TestBed.inject(SubscriptionService);
    serviceCSI = TestBed.inject(CsiService);
    serviceAct = TestBed.inject(ActivatedRoute);

    sub = {
      csi: 'csiTest',
      userId:'userIdTest',
      docId: 'docIdTest'
    };
  });

  it('should go display csi page with cookie check true', () => {
    const spy = spyOn(serviceCSI,'getACSI').and.returnValue(of([[csi]]));
    spyOn(serviceCookie, 'check').and.returnValue(true);
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should go display csi page with cookie check false', () => {
    const spy = spyOn(serviceCSI,'getACSI').and.returnValue(of([[csi]]));
    spyOn(serviceCookie, 'check').and.returnValue(false);
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should go display csi page with cookie get condition true', () => {
    const spy = spyOn(serviceCSI,'getACSI').and.returnValue(of([[csi]]));
    spyOn(serviceCookie, 'check').and.returnValue(true);
    spyOn(serviceCookie, 'get').and.returnValue(csi.name);
    sub.userId = csi.name;
    spyOn(serviceSub, 'getCSISubRequests').and.returnValue(of([[sub, sub.userId],[sub, sub.userId]]));
    //spyOn(serviceCookie, 'get').and.returnValue(csi.name);
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should go to edit CSIs', () => {
    const spy = spyOn(serviceR,'navigate');
    component.editCSI();
    expect(spy).toHaveBeenCalled();
  });

  it('should go to manage subscriptions', () => {
    const spy = spyOn(serviceR,'navigate');
    component.manageSubs();
    expect(spy).toHaveBeenCalled();
  });

  it('should go to toggle subscription', () => {
    spyOn(window,'confirm').and.returnValue(true);
    const spy = spyOn(serviceSub,'addSubRequest').and.returnValue(Promise.resolve());
    (document.getElementById('btnSubscribe') as HTMLButtonElement).innerHTML = 'Subscribe';
    component.toggleSubscribe();
    expect(spy).toHaveBeenCalled();
  });

  it('should go to toggle subscription else', () => {
    const spy = spyOn(window,'confirm').and.returnValue(false);
    (document.getElementById('btnSubscribe') as HTMLButtonElement).innerHTML = 'Subscribe';
    component.toggleSubscribe();
    expect(spy).toHaveBeenCalled();
  });

  it('should go to toggle to unsubscribe', () => {
    (document.getElementById('btnSubscribe') as HTMLButtonElement).innerHTML = 'Unsubscribe';
    component.toggleSubscribe();
    expect((document.getElementById('btnSubscribe') as HTMLButtonElement).innerHTML).toBe('Unsubscribe');
  });

  it('should go to toggle to else', () => {
    (document.getElementById('btnSubscribe') as HTMLButtonElement).innerHTML = 'Unsubscdribe';
    component.toggleSubscribe();
    expect((document.getElementById('btnSubscribe') as HTMLButtonElement).innerHTML).toBe('Unsubscdribe');
  });

});
