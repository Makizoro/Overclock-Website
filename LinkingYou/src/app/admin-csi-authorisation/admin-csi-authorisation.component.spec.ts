import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AdminCsiAuthorisationComponent } from './admin-csi-authorisation.component';

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
import { CSI } from '../entities/csi.model';
import {PersonService} from '../services/person.service';
import {AuthService} from '../services/auth.service';
import {CsiService} from '../services/csi.service';
import { Person } from '../entities/person.model';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';



describe('AdminCsiAuthorisationComponent', () => {
  let component: AdminCsiAuthorisationComponent;
  let fixture: ComponentFixture<AdminCsiAuthorisationComponent>;
  let csi: CSI;
  let person: Person;
  let serviceAuth: AuthService;
  let serviceCSI: CsiService;
  let servicePerson: PersonService;
  let serviceR: Router;
  let spy: jasmine.Spy;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule,
        RouterTestingModule
      ],
      providers: [ AuthService, CsiService, PersonService ],
      declarations: [ AdminCsiAuthorisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCsiAuthorisationComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    serviceCSI = TestBed.inject(CsiService);
    servicePerson = TestBed.inject(PersonService);
    serviceAuth = TestBed.inject(AuthService);
    serviceR = TestBed.inject(Router);
    
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

  it('should get person', fakeAsync(() => {
    spy = spyOn(servicePerson, 'getPerson').and.returnValue(of(person));
    spyOn(serviceAuth, 'userId').and.returnValue(of('userId'));
    spyOn(serviceR,'navigate');
    spyOn(serviceCSI, 'getCSIRequests').and.returnValue(of([csi, csi]));

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  }));

  it('should get person', fakeAsync(() => {
    person.type = 'Admin';
    spy = spyOn(servicePerson, 'getPerson').and.returnValue(of(person));
    spyOn(serviceAuth, 'userId').and.returnValue(of('userId'));
    spyOn(serviceCSI, 'getCSIRequests').and.returnValue(of([[csi, csi]]));

    component.ngOnInit();
    tick(500);

    expect(spy).toHaveBeenCalled();
  }));

  it('should display club csi data', () => {
    component.displayCsiData([[csi, csi]]);
    
    expect(de.query(By.css('h5')).nativeElement.innerText).toContain(csi.name);
  });

  it('should display society csi data', () => {
    csi.type = 'Society';

    component.displayCsiData([[csi, csi]]);
    
    expect(de.query(By.css('h5')).nativeElement.innerText).toContain(csi.name);
  });

  it('should display society csi data', () => {
    csi.type = 'Interest Group';

    component.displayCsiData([[csi, csi]]);
    
    expect(de.query(By.css('h5')).nativeElement.innerText).toContain(csi.name);
  });

  it('should judge true csi data', () => {
    const newDiv = document.createElement('div') as HTMLDivElement;
    newDiv.id = csi.name;
    const csiTitle = document.createElement('h5');
    csiTitle.innerHTML = csi.name;
    newDiv.append(csiTitle);
    const c = document.getElementById('clubList');
    c.appendChild(newDiv);

    const spy = spyOn(serviceCSI, 'addCSI').and.returnValue(Promise.resolve());
    spyOn(serviceCSI, 'delete');

    component.judge(true, [csi, csi.id]);
    
    expect(spy).toHaveBeenCalledWith(csi);
  });

  it('should judge false csi data', () => {
    const newDiv = document.createElement('div') as HTMLDivElement;
    newDiv.id = csi.name;
    const csiTitle = document.createElement('h5');
    csiTitle.innerHTML = csi.name;
    newDiv.append(csiTitle);
    const c = document.getElementById('clubList');
    c.appendChild(newDiv);

    const spy = spyOn(serviceCSI, 'delete');

    component.judge(false, [csi, csi.id]);
    
    expect(spy).toHaveBeenCalled();
  });
});
