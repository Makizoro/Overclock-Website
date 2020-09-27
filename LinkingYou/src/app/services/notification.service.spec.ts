import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
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

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ 
        AngularFireModule.initializeApp(config),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule
      ]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
