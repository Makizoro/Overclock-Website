import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { CsiTabsComponent } from './csi-tabs.component';

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
import { CSI } from '../entities/csi.model';
import { CsiService } from '../services/csi.service';

describe('CsiTabsComponent', () => {
  let component: CsiTabsComponent;
  let fixture: ComponentFixture<CsiTabsComponent>;
  let csi: CSI;
  let de: DebugElement;
  let service: CsiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule
      ],
      providers: [ CsiService],
      declarations: [ CsiTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiTabsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

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

  it('should create', fakeAsync(() => {
    const spy = spyOn(service, 'getCSI').and.returnValue(of([csi, csi]));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  }));

  it('should display csi club data', () => {
    component.displayCSIData([csi, csi]);
    
    expect(de.query(By.css('h5')).nativeElement.innerText).toContain('clubName');
  });

  it('should display csi society data', () => {
    csi.type = 'Society';

    component.displayCSIData([csi, csi]);
    
    expect(de.query(By.css('h5')).nativeElement.innerText).toContain('clubName');
  });

  it('should display csi interest group data', () => {
    csi.type = 'Interest Group';

    component.displayCSIData([csi, csi]);
    
    expect(de.query(By.css('h5')).nativeElement.innerText).toContain('clubName');
  });

  

});
