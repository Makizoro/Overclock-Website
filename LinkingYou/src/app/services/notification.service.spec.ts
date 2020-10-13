import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NotificationService } from './notification.service';
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
import {Notification} from '../entities/notification.model'
import { from } from 'rxjs';

describe('NotificationService', () => {
  let service: NotificationService;

  const notification = {
    csi: 'csiName',
    message: 'message'
  };

  const collectionSpy = jasmine.createSpyObj({
    snapshotChanges: of(notification),
    add: Promise.resolve()
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
      providers: [ NotificationService, {provide: AngularFirestore, useValue: afSpy} ]

    });
    service = TestBed.inject(NotificationService);

   
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get an notification', fakeAsync(() => {
    service.getNotificationList(notification.csi);
    expect(collectionSpy.snapshotChanges).toHaveBeenCalled();
  }));

  it('should add a notification', fakeAsync(() => {
    service.addNotification(notification);
    expect(collectionSpy.add).toHaveBeenCalled();
  }));

});
