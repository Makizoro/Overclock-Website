import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CsiSubmissionFormComponent } from './csi-submission-form.component';

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
import { PersonService } from '../services/person.service';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Person } from '../entities/person.model';
import { CsiService } from '../services/csi.service';
import { CSI } from '../entities/csi.model';
import { CookieService } from 'ngx-cookie-service';

describe('CsiSubmissionFormComponent', () => {
  let component: CsiSubmissionFormComponent;
  let fixture: ComponentFixture<CsiSubmissionFormComponent>;
  let servicePerson: PersonService;
  let serviceAuth: AuthService;
  let serviceR: Router;
  let serviceCSI: CsiService;
  let serviceCookie: CookieService; 
  let person: Person;
  let csi: CSI;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule,
        RouterTestingModule
      ],
      providers: [ PersonService, AuthService, CsiService, CookieService ],
      declarations: [ CsiSubmissionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiSubmissionFormComponent);
    component = fixture.componentInstance;

    serviceR = TestBed.inject(Router);
    serviceAuth = TestBed.inject(AuthService);
    servicePerson = TestBed.inject(PersonService);
    serviceCSI = TestBed.inject(CsiService);
    serviceCookie = TestBed.inject(CookieService);

    person = {
      username: 'testPerson',
      email: 'person@test.com',
      password: '123456',
      csiName: 'None',
      type: 'User'
    };

    csi = {
      name: 'clubName',
      description: 'clubDescription', 
      type: 'Club',
      id: 'id',
      venue: 'clubVenue',
      email: 'clubEmail'
    };

  });

  it('should initiate for User', fakeAsync(() => {
    const spy = spyOn(servicePerson, 'getPerson').and.returnValue(of([person]));
    spyOn(serviceR, 'navigate');
    spyOn(serviceAuth, 'userId').and.returnValue(of('userId'));
    spyOn(serviceAuth, 'signIn').and.returnValue(Promise.resolve(true));

    component.ngOnInit();
    
    expect(spy).toHaveBeenCalled();
  }));

  it('should initiate for none-User', fakeAsync(() => {
    person.type = 'CSI';
    const spy = spyOn(servicePerson, 'getPerson').and.returnValue(of([person]));
    spyOn(serviceR, 'navigate');
    spyOn(serviceAuth, 'userId').and.returnValue(of('userId'));
    spyOn(serviceAuth, 'signIn').and.returnValue(Promise.resolve(true));

    component.ngOnInit();
    tick(500);
    
    expect(spy).toHaveBeenCalled();
  }));

  it('should submit form for club', fakeAsync(() => {
    spyOn(serviceCSI, 'addCSIRequest').and.returnValue(Promise.resolve());
    const spy = spyOn(serviceCSI, 'getCSIRequests').and.returnValue(of([[csi, csi]]));
    spyOn(serviceR, 'navigate');
    spyOn(serviceCookie, 'get').and.returnValue(csi.id);

    (document.getElementById('nameInput') as HTMLInputElement).value = 'nameInput';
    (document.getElementById('emailInput') as HTMLInputElement).value = 'emailInput';
    (document.getElementById('venueInput') as HTMLInputElement).value = 'venueInput';
    (document.getElementById('descriptionInput') as HTMLInputElement).value = 'descriptionInput';
    (document.getElementById('typeInputClub') as HTMLInputElement).checked = true;

    component.submitForm();
    tick(500);
    
    expect((document.getElementById('nameInput') as HTMLInputElement).value).toBe('nameInput');
  }));

  it('should submit form for interest group', fakeAsync(() => {
    spyOn(serviceCSI, 'addCSIRequest').and.returnValue(Promise.resolve());
    csi.type = 'Interest Group';
    const spy = spyOn(serviceCSI, 'getCSIRequests').and.returnValue(of([[csi, csi]]));
    spyOn(serviceR, 'navigate');
    spyOn(serviceCookie, 'get').and.returnValue(csi.id);

    (document.getElementById('nameInput') as HTMLInputElement).value = 'nameInput';
    (document.getElementById('emailInput') as HTMLInputElement).value = 'emailInput';
    (document.getElementById('venueInput') as HTMLInputElement).value = 'venueInput';
    (document.getElementById('descriptionInput') as HTMLInputElement).value = 'descriptionInput';
    (document.getElementById('typeInputInterestGroup') as HTMLInputElement).checked = true;

    component.submitForm();
    tick(500);
    
    expect((document.getElementById('nameInput') as HTMLInputElement).value).toBe('nameInput');
  }));

  it('should submit form for society', fakeAsync(() => {
    spyOn(serviceCSI, 'addCSIRequest').and.returnValue(Promise.resolve());
    csi.type = 'Society';
    const spy = spyOn(serviceCSI, 'getCSIRequests').and.returnValue(of([[csi, csi]]));
    spyOn(serviceR, 'navigate');
    spyOn(serviceCookie, 'get').and.returnValue(csi.id);

    (document.getElementById('nameInput') as HTMLInputElement).value = 'nameInput';
    (document.getElementById('emailInput') as HTMLInputElement).value = 'emailInput';
    (document.getElementById('venueInput') as HTMLInputElement).value = 'venueInput';
    (document.getElementById('descriptionInput') as HTMLInputElement).value = 'descriptionInput';
    (document.getElementById('typeInputSociety') as HTMLInputElement).checked = true;

    component.submitForm();
    tick(500);
    
    expect((document.getElementById('nameInput') as HTMLInputElement).value).toBe('nameInput');
  }));

  it('should submit form for none', fakeAsync(() => {
    spyOn(serviceCSI, 'addCSIRequest').and.returnValue(Promise.resolve());
    const spy = spyOn(serviceCSI, 'getCSIRequests').and.returnValue(of([[csi, csi]]));
    spyOn(serviceR, 'navigate');
    spyOn(serviceCookie, 'get').and.returnValue(csi.id);

    (document.getElementById('nameInput') as HTMLInputElement).value = 'nameInput';
    (document.getElementById('emailInput') as HTMLInputElement).value = 'emailInput';
    (document.getElementById('venueInput') as HTMLInputElement).value = 'venueInput';
    (document.getElementById('descriptionInput') as HTMLInputElement).value = 'descriptionInput';

    component.submitForm();
    tick(500);
    
    expect((document.getElementById('nameInput') as HTMLInputElement).value).toBe('nameInput');
  }));

  it('should submit form for valid csi request', fakeAsync(() => {
    spyOn(serviceCSI, 'addCSIRequest').and.returnValue(Promise.resolve());
    const spy = spyOn(serviceCSI, 'getCSIRequests').and.returnValue(of([[csi, csi]]));
    spyOn(serviceR, 'navigate');
    spyOn(serviceCookie, 'get').and.returnValue(csi.id+' ');

    (document.getElementById('nameInput') as HTMLInputElement).value = 'nameInput';
    (document.getElementById('emailInput') as HTMLInputElement).value = 'emailInput';
    (document.getElementById('venueInput') as HTMLInputElement).value = 'venueInput';
    (document.getElementById('descriptionInput') as HTMLInputElement).value = 'descriptionInput';
    (document.getElementById('typeInputClub') as HTMLInputElement).checked = true;

    component.submitForm();
    tick(500);
    
    expect((document.getElementById('nameInput') as HTMLInputElement).value).toBe('nameInput');
  }));
});
