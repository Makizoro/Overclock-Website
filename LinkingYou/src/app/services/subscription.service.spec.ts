import { fakeAsync, TestBed } from '@angular/core/testing';

import { SubscriptionService } from './subscription.service';

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
import { Subscription } from '../entities/subscription.model';

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let sub: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule
      ]
    });
    service = TestBed.inject(SubscriptionService);

    sub = {
      csi: 'csiName',
      userId: 'userId',
      docId: 'docId'
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add subscription request', fakeAsync(() => {
    const spy = spyOn(service,'addSubRequest').and.returnValue(Promise.resolve());
    service.addSubRequest(sub);
    expect(spy).toHaveBeenCalled();
  }));

  it('should add subscription', fakeAsync(() => {
    const spy = spyOn(service,'addSubscription').and.returnValue(Promise.resolve());
    service.addSubscription(sub);
    expect(spy).toHaveBeenCalled();
  }));

  it('should delete subscription', fakeAsync(() => {
    const spy = spyOn(service,'delete');
    service.delete(sub.docId);
    expect(spy).toHaveBeenCalled();
  }));

  it('should get subscription list for a csi', fakeAsync(() => {
    const spy = spyOn(service,'getCSISubList').and.returnValue([sub, sub]);
    service.getCSISubList(sub.csi);
    expect(spy).toHaveBeenCalled();
  }));

  it('should get subscription request list for a csi', fakeAsync(() => {
    const spy = spyOn(service,'getCSISubRequests').and.returnValue([sub, sub]);
    service.getCSISubRequests(sub.csi);
    expect(spy).toHaveBeenCalled();
  }));

  it('should get subscription list for a user', fakeAsync(() => {
    const spy = spyOn(service,'getSubList').and.returnValue([sub, sub]);
    service.getSubList(sub.userId);
    expect(spy).toHaveBeenCalled();
  }));


});
