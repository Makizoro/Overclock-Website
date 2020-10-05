import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import {AuthService} from '../services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';
import { AppRouteModule } from '../app.route';
import { PersonService } from '../services/person.service';
import { Person } from '../entities/person.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;

  let servicePerson: PersonService;
  let serviceAuth: AuthService;
  let serviceAuthGet: AuthService;
  let spyAg: jasmine.Spy;
  let spyP: jasmine.Spy;
  let spyA: jasmine.Spy;
  let person: Person;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule
      ],
      declarations: [ LoginComponent ],
      providers: [ AuthService, PersonService ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    servicePerson = TestBed.inject(PersonService);
    serviceAuth = TestBed.inject(AuthService);
    serviceAuthGet = TestBed.inject(AuthService);

    person = {
      username: 'testPerson',
      email: 'person@test.com',
      password: '123456',
      csiName: 'None',
      type: 'User'
    };

    fixture.detectChanges();
  });

  it('should sign in', fakeAsync(() => {
    spyP = spyOn(servicePerson, 'getPerson').and.returnValue(of([person]));

    spyAg = spyOn(serviceAuthGet, 'userId').and.returnValue(of('userId'));
    spyA = spyOn(serviceAuth, 'signIn').and.returnValue(Promise.resolve(true));

    document.getElementById('email').innerHTML = 'username@test.com';
    document.getElementById('password').innerHTML = '123456';

    component.login();
    
    fixture.detectChanges();
    expect(spyA).toHaveBeenCalled();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle', () => {
    expect(component.passViss).toBeFalsy();
    component.togglePassword();
    expect(component.passViss).toBeTruthy();
  });

  it('should forget password', () => {
    const f = document.getElementById('forgotPassword') as HTMLParagraphElement;
    component.forgot(true);
    expect(f.style.color).toBe('red');
    component.forgot(false);
    expect(f.style.color).toBe('rgb(170, 170, 170)');
  });

  it('should have a h1 tag of "Welcome To Linking You" ', () => {
    expect(de.query(By.css('h1')).nativeElement.innerText).toBe('Welcome To Linking You');
  });

  it('should have a h2 tag of "Email" ', () => {
    expect(de.query(By.css('h2')).nativeElement.innerText).toBe('Email:');
  });
});
