import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiEventDetailsComponent } from './csi-event-details.component';

describe('CsiEventDetailsComponent', () => {
  let component: CsiEventDetailsComponent;
  let fixture: ComponentFixture<CsiEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
