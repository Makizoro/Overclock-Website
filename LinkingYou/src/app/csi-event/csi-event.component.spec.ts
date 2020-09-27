import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiEventComponent } from './csi-event.component';

describe('CsiEventComponent', () => {
  let component: CsiEventComponent;
  let fixture: ComponentFixture<CsiEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
