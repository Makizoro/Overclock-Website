import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { UserPageComponent } from './user-page.component';

import { PersonService } from '../services/person.service';
import { AuthService } from '../services/auth.service';
import {DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';
import { AppRouteModule } from '../app.route';
import { Person } from '../entities/person.model';


describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;
  let serviceP: PersonService;
  let serviceA: AuthService;
  let spyAuth: jasmine.Spy;
  let spyPerson: jasmine.Spy;
  let person: Person;
  // let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule
      ],
      declarations: [ UserPageComponent ],
      providers: [AuthService, PersonService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;

    serviceA = TestBed.inject(AuthService);
    serviceP = TestBed.inject(PersonService);
    person = {
      username: 'testPerson',
      email: 'person@test.com',
      password: '123456',
      csiName: 'None',
      type: 'User'
    };

  });

  it('should display user info', fakeAsync(() => {
    spyPerson = spyOn(serviceP, 'getPerson').and.returnValue(of([person]));
    spyAuth = spyOn(serviceA, 'userId').and.returnValue(of('personId'));
    fixture.detectChanges();
    expect(spyAuth).toHaveBeenCalled();
    expect(spyPerson).toHaveBeenCalled();
  }));
});
