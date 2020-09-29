import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { from } from 'rxjs';

import { WelcomePageComponent } from './welcome-page.component';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {DebugElement} from '@angular/core'
import { By } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { config} from '../app.module'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';
import { AppRouteModule } from '../app.route';

describe('WelcomePageComponent', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ 
        AngularFireModule.initializeApp(config),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule
      ],
      declarations: [ WelcomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePageComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  /*it('should have a P tag of "welcome-page works!" ', () => {
    expect(de.query(By.css('p')).nativeElement.innerText).toBe('welcome-page works!');
  });*/

  it('should nav with csi', () => {
    expect(component.navToCSI('dave')).toBeUndefined();
  });



});
