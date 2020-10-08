import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';

import { By } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import {AuthService} from '../services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {FormsModule, NgForm} from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';
import { AppRouteModule } from '../app.route';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let rgForm: NgForm;
  let service: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule,
        FormsModule
      ],
      declarations: [ RegisterComponent ],
      providers: [ AuthService, NgForm ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(AuthService);
    rgForm = TestBed.inject(NgForm);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle', () => {
    expect(component.passViss).toBeFalsy();
    component.togglePassword();
    expect(component.passViss).toBeTruthy();
    component.togglePassword();
    expect(component.passViss).toBeFalsy();
  });

  it('should register', fakeAsync(() => {
    const spy = spyOn(service,'register').and.returnValue(Promise.resolve());
    component.signup(rgForm);
    expect(spy).toHaveBeenCalled();
  }));

});
