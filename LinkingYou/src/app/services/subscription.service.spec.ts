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
  const sub = {
  csi: 'csiName',
  userId: 'userId',
  docId: 'docId'
  };

  const collectionSpy = jasmine.createSpyObj({
    snapshotChanges: of(sub),
    delete: Promise.resolve()
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
      providers: [ SubscriptionService, {provide: AngularFirestore, useValue: afSpy} ]

    });
    service = TestBed.inject(SubscriptionService);

    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get an notification', fakeAsync(() => {
    service.getSubList(sub.csi);
    expect(collectionSpy.snapshotChanges).toHaveBeenCalled();
  }));

  it('should get an notification', fakeAsync(() => {
    service.getCSISubRequests(sub.csi);
    expect(collectionSpy.snapshotChanges).toHaveBeenCalled();
  }));

  it('should get an notification', fakeAsync(() => {
    service.getCSISubList(sub.csi);
    expect(collectionSpy.snapshotChanges).toHaveBeenCalled();
  }));

  


});
