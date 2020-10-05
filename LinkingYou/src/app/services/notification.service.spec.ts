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
  let notification: Notification;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule
      ]
    });
    service = TestBed.inject(NotificationService);

    notification = {
      csi: 'csiName',
      message: 'message'
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add notification', fakeAsync(() => {
    const spy = spyOn(service,'addNotification').and.returnValue(Promise.resolve());
    service.addNotification(notification);
    expect(spy).toHaveBeenCalled();
  }));

  it('should get notification of csi', fakeAsync(() => {
    const spy = spyOn(service,'getNotificationList').and.returnValue(Promise.resolve());
    service.getNotificationList(notification.csi);
    expect(spy).toHaveBeenCalled();
  }));


});
