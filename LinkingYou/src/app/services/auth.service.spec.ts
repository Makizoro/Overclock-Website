import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

import { PersonService } from './person.service';
import { Router } from '@angular/router';

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


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ 
        AngularFireModule.initializeApp(config),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule
      ]
    });
    
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
