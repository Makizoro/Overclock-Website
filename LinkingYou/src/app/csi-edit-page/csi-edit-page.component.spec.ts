import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { CsiEditPageComponent } from './csi-edit-page.component';

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
import { CsiService } from '../services/csi.service';
import { CSI } from '../entities/csi.model';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('CsiEditPageComponent', () => {
  let component: CsiEditPageComponent;
  let fixture: ComponentFixture<CsiEditPageComponent>;
  let service: CsiService;
  let csi: CSI;
  let serviceR: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule,
        RouterTestingModule
      ],
      providers: [ CsiService],
      declarations: [ CsiEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiEditPageComponent);
    component = fixture.componentInstance;

    serviceR = TestBed.inject(Router);
    service = TestBed.inject(CsiService);

    csi = {
      name: 'clubName',
      description: 'clubDescription', 
      type: 'Club',
      id: 'id',
      venue: 'clubVenue',
      email: 'clubEmail'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should update Club', fakeAsync(() => {
    const spy = spyOn(service, 'updateCSI').and.returnValue(Promise.resolve());
    spyOn(serviceR, 'navigate');

    (document.getElementById('typeInputClub') as HTMLInputElement).checked;

    document.getElementById('emailInput').innerHTML = csi.email;
    document.getElementById('venueInput').innerHTML = csi.venue;
    document.getElementById('descriptionInput').innerHTML = csi.description;

    component.updateCsi();
    
    expect(spy).toHaveBeenCalled();
  }));*/

});
