import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {DebugElement} from '@angular/core'
import { By } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { config} from '../app.module'
import {AuthService} from '../services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';
import { AppRouteModule } from '../app.route';
import { PersonService } from '../services/person.service';

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


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports:[ 
        AngularFireModule.initializeApp(config),
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

    servicePerson = de.injector.get(PersonService);
    serviceAuth = de.injector.get(AuthService);
    serviceAuthGet = de.injector.get(AuthService);

    spyP = spyOn(servicePerson, 'getPerson').and.returnValue(of('Person data received'));

    spyAg = spyOn(serviceAuthGet, 'userId').and.returnValue(of('Authenticated'));
    spyA = spyOn(serviceAuth, 'signIn').and.returnValue(Promise.resolve(true));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle', () => {
    expect(component.togglePassword()).toBeUndefined();
  });

  it('should ngOnint', () => {
    expect(component.ngOnInit()).toBeUndefined();
  });

  it('should forget password', () => {
    expect(component.forgot(true)).toBeUndefined();
    expect(component.forgot(true)).toBeUndefined();
  });

  it('should have a h1 tag of "Welcome To Linking You" ', () => {
    expect(de.query(By.css('h1')).nativeElement.innerText).toBe('Welcome To Linking You');
  });

  it('should have a h2 tag of "Email" ', () => {
    expect(de.query(By.css('h2')).nativeElement.innerText).toBe('Email:');
  });
  
});
