import { fakeAsync, TestBed } from '@angular/core/testing';

import { CsiService } from './csi.service';

import {DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';
import { AppRouteModule } from '../app.route';
import { CSI } from '../entities/csi.model';

describe('CsiService', () => {
  let service: CsiService;
  let csi: CSI;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule
      ]
    });
    service = TestBed.inject(CsiService);

    csi = {
      name: 'clubName',
      description: 'clubDescription', 
      type: 'Club',
      id: 'id',
      venue: 'clubVenue',
      email: 'clubEmail'
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a csi', fakeAsync(() => {
    const spy = spyOn(service,'addCSI').and.returnValue(Promise.resolve());
    service.addCSI(csi);
    expect(spy).toHaveBeenCalled();
  }));

  it('should add a csi request', fakeAsync(() => {
    const spy = spyOn(service,'addCSIRequest').and.returnValue(Promise.resolve());
    service.addCSIRequest(csi.name,csi.type,csi.description,csi.venue,csi.email);
    expect(spy).toHaveBeenCalled();
  }));

  it('should delete a csi', fakeAsync(() => {
    const spy = spyOn(service,'delete');
    service.delete(csi.id);
    expect(spy).toHaveBeenCalled();
  }));

  it('should get a csi', fakeAsync(() => {
    const spy = spyOn(service,'getACSI').and.returnValue(Promise.resolve());
    service.getACSI(csi.name);
    expect(spy).toHaveBeenCalled();
  }));

  it('should get list of clubs', fakeAsync(() => {
    const spy = spyOn(service,'getCSI').and.returnValue([csi,csi]);
    service.getCSI(csi.type);
    expect(spy).toHaveBeenCalled();
  }));

  it('should get list of Societies', fakeAsync(() => {
    csi.type = 'Society';
    const spy = spyOn(service,'getCSI').and.returnValue([csi,csi]);
    service.getCSI(csi.type);
    expect(spy).toHaveBeenCalled();
  }));

  it('should get list of Interest groups', fakeAsync(() => {
    csi.type = 'Interest Group';
    const spy = spyOn(service,'getCSI').and.returnValue([csi,csi]);
    service.getCSI(csi.type);
    expect(spy).toHaveBeenCalled();
  }));

  it('should get list of csi', fakeAsync(() => {
    const spy = spyOn(service,'getCSI').and.returnValue([csi,csi]);
    service.getCSI();
    expect(spy).toHaveBeenCalled();
  }));

  it('should update csi info', fakeAsync(() => {
    const spy = spyOn(service,'updateCSI').and.returnValue(Promise.resolve());
    service.updateCSI(csi);
    expect(spy).toHaveBeenCalled();
  }));

  it('should get list of csi', fakeAsync(() => {
    const spy = spyOn(service,'getCSIRequests').and.returnValue([csi,csi]);
    service.getCSIRequests();
    expect(spy).toHaveBeenCalled();
  }));
});
