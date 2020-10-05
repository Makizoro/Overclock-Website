import { fakeAsync, TestBed } from '@angular/core/testing';

import { PersonService } from './person.service';

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
import { Person } from '../entities/person.model';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('PersonService', () => {
  let service: PersonService;
  let person: Person;
  let serviceR: Router;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(PersonService);
    serviceR = TestBed.inject(Router);

    person = {
      username: 'testPerson',
      email: 'person@test.com',
      password: '123456',
      csiName: 'None',
      type: 'User'
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add person', fakeAsync(() => {
    const spy = spyOn(service,'createPerson').and.returnValue(Promise.resolve());
    spyOn(serviceR, 'navigate');
    service.createPerson(person, serviceR,'id');
    expect(spy).toHaveBeenCalled();
  }));

  it('should delete person', fakeAsync(() => {
    const spy = spyOn(service,'deletePerson');
    service.deletePerson();
    expect(spy).toHaveBeenCalled();
  }));

  it('should get person', fakeAsync(() => {
    const spy = spyOn(service,'getPerson').and.returnValue(person);
    service.getPerson('personDocId');
    expect(spy).toHaveBeenCalled();
  }));

  it('should delete person', fakeAsync(() => {
    const spy = spyOn(service,'updatePerson');
    service.updatePerson(person);
    expect(spy).toHaveBeenCalled();
  }));
});
