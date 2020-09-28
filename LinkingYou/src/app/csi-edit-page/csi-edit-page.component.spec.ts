import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiEditPageComponent } from './csi-edit-page.component';

describe('CsiEditPageComponent', () => {
  let component: CsiEditPageComponent;
  let fixture: ComponentFixture<CsiEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
