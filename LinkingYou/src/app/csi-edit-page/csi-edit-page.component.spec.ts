import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CsiEditPageComponent } from './csi-edit-page.component';

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
import { CsiService } from '../services/csi.service';
import { CSI } from '../entities/csi.model';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

describe('CsiEditPageComponent', () => {
  let component: CsiEditPageComponent;
  let fixture: ComponentFixture<CsiEditPageComponent>;
  let csi: CSI;
  let serviceR: Router;
  let serviceCoookie: CookieService;
  let serviceCSI: CsiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule,
        RouterTestingModule
      ],
      providers: [ CsiService, CookieService],
      declarations: [ CsiEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiEditPageComponent);
    component = fixture.componentInstance;

    serviceR = TestBed.inject(Router);
    serviceCSI = TestBed.inject(CsiService);
    serviceCoookie = TestBed.inject(CookieService);

    csi = {
      name: 'clubName',
      description: 'clubDescription', 
      type: 'Club',
      id: 'id',
      venue: 'clubVenue',
      email: 'clubEmail'
    };

  });

  it('should initiate else branch', () => {
    const spy = spyOn(serviceCSI,'getACSI').and.returnValue(of([csi, csi.id]));
    spyOn(serviceCoookie, 'check').and.returnValue(true);
    spyOn(serviceCoookie, 'get').and.returnValue(csi.name);
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should initiate else branch society', () => {
    csi.type = 'Society';
    const spy = spyOn(serviceCSI,'getACSI').and.returnValue(of([csi, csi.id]));
    spyOn(serviceCoookie, 'check').and.returnValue(true);
    spyOn(serviceCoookie, 'get').and.returnValue(csi.name);
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should initiate else branch interest group', () => {
    csi.type = 'Interest Group';
    const spy = spyOn(serviceCSI,'getACSI').and.returnValue(of([csi, csi.id]));
    spyOn(serviceCoookie, 'check').and.returnValue(true);
    spyOn(serviceCoookie, 'get').and.returnValue(csi.name);
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should initiate if branch', () => {
    const spy = spyOn(serviceR,'navigate');
    spyOn(serviceCoookie, 'check').and.returnValue(false);
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should update Club', fakeAsync(() => {
    const spy = spyOn(serviceCSI, 'updateCSI');
    spyOn(serviceR, 'navigate');

    (document.getElementById('typeInputClub') as HTMLInputElement).checked = true;

    (document.getElementById('emailInput') as HTMLInputElement).value = csi.email;
    (document.getElementById('venueInput') as HTMLInputElement).value = csi.venue;
    (document.getElementById('descriptionInput') as HTMLInputElement).value = csi.description;

    component.csi = csi;
    component.updateCsi();
    
    expect(spy).toHaveBeenCalled();
  }));

  it('should update Society', fakeAsync(() => {
    const spy = spyOn(serviceCSI, 'updateCSI');
    spyOn(serviceR, 'navigate');

    (document.getElementById('typeInputSociety') as HTMLInputElement).checked = true;

    (document.getElementById('emailInput') as HTMLInputElement).value = csi.email;
    (document.getElementById('venueInput') as HTMLInputElement).value = csi.venue;
    (document.getElementById('descriptionInput') as HTMLInputElement).value = csi.description;

    component.csi = csi;
    component.updateCsi();
    
    expect(spy).toHaveBeenCalled();
  }));

  it('should update Interest Group', fakeAsync(() => {
    const spy = spyOn(serviceCSI, 'updateCSI');
    spyOn(serviceR, 'navigate');

    (document.getElementById('typeInputInterestGroup') as HTMLInputElement).checked = true;

    (document.getElementById('emailInput') as HTMLInputElement).value = csi.email;
    (document.getElementById('venueInput') as HTMLInputElement).value = csi.venue;
    (document.getElementById('descriptionInput') as HTMLInputElement).value = csi.description;

    component.csi = csi;
    component.updateCsi();
    
    expect(spy).toHaveBeenCalled();
  }));

  it('should make type empty', () => {
    const spy = spyOn(window, 'alert');

    (document.getElementById('emailInput') as HTMLInputElement).value = csi.email;
    (document.getElementById('venueInput') as HTMLInputElement).value = csi.venue;
    (document.getElementById('descriptionInput') as HTMLInputElement).value = csi.description;

    component.csi = csi;
    component.updateCsi();
    
    expect(spy).toHaveBeenCalled();
  });

  it('should make email empty', () => {
    const spy = spyOn(window, 'alert');

    (document.getElementById('typeInputInterestGroup') as HTMLInputElement).checked = true;

    (document.getElementById('venueInput') as HTMLInputElement).value = csi.venue;
    (document.getElementById('descriptionInput') as HTMLInputElement).value = csi.description;

    component.csi = csi;
    component.updateCsi();
    
    expect(spy).toHaveBeenCalled();
  });

  it('should make venue empty', () => {
    const spy = spyOn(window, 'alert');

    (document.getElementById('typeInputInterestGroup') as HTMLInputElement).checked = true;

    (document.getElementById('emailInput') as HTMLInputElement).value = csi.email;
    (document.getElementById('descriptionInput') as HTMLInputElement).value = csi.description;

    component.csi = csi;
    component.updateCsi();
    
    expect(spy).toHaveBeenCalled();
  });

  it('should make description empty', () => {
    const spy = spyOn(window, 'alert');

    (document.getElementById('typeInputInterestGroup') as HTMLInputElement).checked = true;

    (document.getElementById('emailInput') as HTMLInputElement).value = csi.email;
    (document.getElementById('venueInput') as HTMLInputElement).value = csi.venue;
    (document.getElementById('descriptionInput') as HTMLInputElement).value = '';

    component.csi = csi;
    component.updateCsi();  
    
    expect(spy).toHaveBeenCalled();
  });

});
