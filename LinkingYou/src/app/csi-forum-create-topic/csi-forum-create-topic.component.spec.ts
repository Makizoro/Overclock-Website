import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiForumCreateTopicComponent } from './csi-forum-create-topic.component';

describe('CsiForumCreateTopicComponent', () => {
  let component: CsiForumCreateTopicComponent;
  let fixture: ComponentFixture<CsiForumCreateTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiForumCreateTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiForumCreateTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
