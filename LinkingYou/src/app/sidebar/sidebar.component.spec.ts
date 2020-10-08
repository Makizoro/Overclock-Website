import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
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
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let service: Router;
  let serviceAuth: AuthService;
  let serviceCookie: CookieService;
  let spyAuth: jasmine.Spy;
  let spyR: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule,
        RouterTestingModule
      ],
      providers: [ AuthService ],
      declarations: [ SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;

    serviceAuth = TestBed.inject(AuthService);
    service = TestBed.inject(Router);
    serviceCookie = TestBed.inject(CookieService);

    spyAuth = spyOn(serviceAuth, 'signOut').and.returnValue(Promise.resolve());
    spyR = spyOn(service, 'navigate');
    spyOn(serviceCookie, 'deleteAll');

    fixture.detectChanges();
  });

  it('should async logout', fakeAsync(() => {
    component.logout();
    fixture.detectChanges();
    expect(spyAuth).toHaveBeenCalled();
  }));

  it('should display subs if', fakeAsync(() => {
    spyOn(serviceCookie,'check').and.returnValue(true);
    const spy = spyOn(serviceCookie,'get').and.returnValue('email/password test');
    component.ngOnInit();
    tick(500);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  }));
  it('should display subs else', fakeAsync(() => {
    const spy = spyOn(serviceCookie,'check').and.returnValue(false);
    component.ngOnInit();
    tick(500);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should nav with csi', fakeAsync(() => {
    component.navToCsi();
    fixture.detectChanges();
    expect(spyR).toHaveBeenCalled();
  }));

  it('should create Admin nav links', () => {
    const adminCSIFormLink = document.getElementById('adminCsiForm');
    component.unblockElements('Admin');
    expect(adminCSIFormLink.style.display).toBe('block');
  });

  it('should create CSI nav links', () => {
    const csiNavLink = document.getElementById('csiAdminPage');
    component.unblockElements('CSI');
    expect(csiNavLink.style.display).toBe('block');
  });

  it('should create User nav links', () => {
    const createCSILink = document.getElementById('createCSI');
    component.unblockElements('User');
    expect(createCSILink.style.display).toBe('block');
  });

  it('should close sideBar', () => {
    expect(component.sideBarClick).toBeFalsy();
    component.sidebarClose();
    expect(component.sideBarClick).toBeTruthy();
  });
});
