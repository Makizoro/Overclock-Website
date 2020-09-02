import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiPageComponent } from './csi-page.component';

describe('CsiPageComponent', () => {
  let component: CsiPageComponent;
  let fixture: ComponentFixture<CsiPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
