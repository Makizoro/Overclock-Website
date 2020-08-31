import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiTabsComponent } from './csi-tabs.component';

describe('CsiTabsComponent', () => {
  let component: CsiTabsComponent;
  let fixture: ComponentFixture<CsiTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
