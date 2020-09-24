import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiForumComponent } from './csi-forum.component';

describe('CsiForumComponent', () => {
  let component: CsiForumComponent;
  let fixture: ComponentFixture<CsiForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
