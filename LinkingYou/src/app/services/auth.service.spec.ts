import { fakeAsync, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

import { PersonService } from './person.service';
import { Router } from '@angular/router';

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


describe('AuthService', () => {
  let service: AuthService;
  let person: Person;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule
      ]
    });

    service = TestBed.inject(AuthService);
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

  it('should register', fakeAsync(() => {
    const spy = spyOn(service,'register').and.returnValue(Promise.resolve());
    service.register('email','password',person);
    expect(spy).toHaveBeenCalled();
  }));

  it('should sign out', fakeAsync(() => {
    const spy = spyOn(service,'signOut').and.returnValue(Promise.resolve());
    service.signOut();
    expect(spy).toHaveBeenCalled();
  }));

  it('should sign in', fakeAsync(() => {
    const spy = spyOn(service,'signIn').and.returnValue(Promise.resolve());
    service.signIn({style:{display: 'l'}},['email','password']);
    expect(spy).toHaveBeenCalled();
  }));

  it('should get userId', fakeAsync(() => {
    const spy = spyOn(service,'userId').and.returnValue(Promise.resolve());
    service.userId();
    expect(spy).toHaveBeenCalled();
  }));

});
