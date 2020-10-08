import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiEventDetailsComponent } from './csi-event-details.component';

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
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { Event } from '../entities/event.model'
import { RouterTestingModule } from '@angular/router/testing';

describe('CsiEventDetailsComponent', () => {
  let component: CsiEventDetailsComponent;
  let fixture: ComponentFixture<CsiEventDetailsComponent>;
  let serviceR: Router;
  let serviceEvent: EventService;
  let event: Event;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule,
        RouterTestingModule
      ],
      providers: [ EventService ],
      declarations: [ CsiEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiEventDetailsComponent);
    component = fixture.componentInstance;

    serviceR = TestBed.inject(Router);
    serviceEvent = TestBed.inject(EventService);

    event = {
      name: 'csiEventName',
      date: 'csiEventDate',
      description: 'csiEventDescription',
      externalLink: 'csiExtLink',
      image: 'csiEventImage',
      venue: 'csiVenue',
      csi: 'csi'
    };

    fixture.detectChanges();
  });

  it('should display event details', () => {
    const spy = spyOn(serviceEvent, 'getEvent').and.returnValue(of([event, event]));
    spyOn(serviceR, 'navigate');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
