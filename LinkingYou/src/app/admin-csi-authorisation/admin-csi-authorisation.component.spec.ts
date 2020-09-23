import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCsiAuthorisationComponent } from './admin-csi-authorisation.component';

describe('AdminCsiAuthorisationComponent', () => {
  let component: AdminCsiAuthorisationComponent;
  let fixture: ComponentFixture<AdminCsiAuthorisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCsiAuthorisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCsiAuthorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
