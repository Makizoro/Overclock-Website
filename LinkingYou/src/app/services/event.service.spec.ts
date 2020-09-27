import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import {DebugElement} from '@angular/core'
import { By } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { config} from '../app.module'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';
import { AppRouteModule } from '../app.route';

describe('EventService', () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ 
        AngularFireModule.initializeApp(config),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule
      ]
    });
    service = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
