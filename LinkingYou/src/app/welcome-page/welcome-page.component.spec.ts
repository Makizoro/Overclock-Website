import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { from } from 'rxjs';

import { WelcomePageComponent } from './welcome-page.component';

import {DebugElement} from '@angular/core'
import {By} from '@angular/platform-browser'

describe('WelcomePageComponent', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a P tag of "welcome-page works!" ', () => {
    expect(de.query(By.css('p')).nativeElement.innerText).toBe('welcome-page works!');
  });
});
