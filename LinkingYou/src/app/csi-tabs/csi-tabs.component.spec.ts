import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiTabsComponent } from './csi-tabs.component';

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

describe('CsiTabsComponent', () => {
  let component: CsiTabsComponent;
  let fixture: ComponentFixture<CsiTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule
      ],
      declarations: [ CsiTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should display csi data', () => {
    expect(component.displayCSIData([1, 2, 3])).toBeUndefined();
  });*/


});
