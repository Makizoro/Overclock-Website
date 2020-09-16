import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiSubmissionFormComponent } from './csi-submission-form.component';

describe('CsiSubmissionFormComponent', () => {
  let component: CsiSubmissionFormComponent;
  let fixture: ComponentFixture<CsiSubmissionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiSubmissionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiSubmissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
