import { fakeAsync, TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import {DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';
import { AppRouteModule } from '../app.route';
import {Event} from '../entities/event.model';
import { from } from 'rxjs';

describe('EventService', () => {
  let service: EventService;
  let event: Event;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule
      ]
    });
    service = TestBed.inject(EventService);

    event = {
      name: 'csiEventName',
      date: 'csiEventDate',
      description: 'csiEventDescription',
      externalLink: 'csiExtLink',
      image: 'csiEventImage',
      venue: 'csiVenue',
      csi: 'csi'
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an event', fakeAsync(() => {
    const spy = spyOn(service,'addEvent').and.returnValue(Promise.resolve());
    service.addEvent(event);
    expect(spy).toHaveBeenCalled();
  }));

  it('should get an event', fakeAsync(() => {
    const spy = spyOn(service,'getEvent').and.returnValue(event);
    service.getEvent(event.name);
    expect(spy).toHaveBeenCalled();
  }));

  it('should get events for a', fakeAsync(() => {
    const spy = spyOn(service,'getEventList').and.returnValue([event,event]);
    service.getEventList(event.csi);
    expect(spy).toHaveBeenCalled();
  }));
});
