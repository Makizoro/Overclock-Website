import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiSubmissionFormComponent } from './csi-submission-form.component';

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

describe('CsiSubmissionFormComponent', () => {
  let component: CsiSubmissionFormComponent;
  let fixture: ComponentFixture<CsiSubmissionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ 
        AngularFireModule.initializeApp(config),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule
      ],
      declarations: [ CsiSubmissionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiSubmissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  
});
