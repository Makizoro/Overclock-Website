import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCsiAuthorisationComponent } from './admin-csi-authorisation.component';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {DebugElement} from '@angular/core'
import { By } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { config} from '../app.module'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';
import { AppRouteModule } from '../app.route';



describe('AdminCsiAuthorisationComponent', () => {
  let component: AdminCsiAuthorisationComponent;
  let fixture: ComponentFixture<AdminCsiAuthorisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ 
        AngularFireModule.initializeApp(config),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule
      ],
      declarations: [ AdminCsiAuthorisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCsiAuthorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 /* it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  it('should ngOnint', () => {
    expect(component.displayCsiData('d')).toBeUndefined();
  });

  it('should ngOnint', () => {
    expect(component.judge(true,'d')).toBeUndefined();
  });
});
