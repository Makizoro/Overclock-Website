import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiManageSubscriptionsComponent } from './csi-manage-subscriptions.component';

describe('CsiManageSubscriptionsComponent', () => {
  let component: CsiManageSubscriptionsComponent;
  let fixture: ComponentFixture<CsiManageSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiManageSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiManageSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
