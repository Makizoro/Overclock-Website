import { fakeAsync, TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import {DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';
import { AppRouteModule } from '../app.route';
import {Event} from '../entities/event.model';
import { from } from 'rxjs';

describe('EventService', () => {
  let service: EventService;

  const event = {
    name: 'csiEventName',
    date: 'csiEventDate',
    description: 'csiEventDescription',
    externalLink: 'csiExtLink',
    image: 'csiEventImage',
    venue: 'csiVenue',
    csi: 'csi'
  };
  
const collectionSpy = jasmine.createSpyObj({
    snapshotChanges: of(event),
});
const afSpy = jasmine.createSpyObj('AngularFirestore', {
    collection: collectionSpy
});

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule
      ],
      providers: [ EventService, {provide: AngularFirestore, useValue: afSpy} ]
    });
    service = TestBed.inject(EventService);

    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*it('should add an event', fakeAsync(() => {
    service.addEvent(event);
    expect(spyOn(service, 'addEvent')).toHaveBeenCalled();
  }));*/

  it('should get an event', fakeAsync(() => {
    service.getEvent(event.name);
    expect(collectionSpy.snapshotChanges).toHaveBeenCalled();
  }));

  it('should get events for a', fakeAsync(() => {
    service.getEventList(event.csi);
    expect(collectionSpy.snapshotChanges).toHaveBeenCalled();
  }));
});
