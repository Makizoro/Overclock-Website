import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiForumTopicComponent } from './csi-forum-topic.component';

describe('CsiForumTopicComponent', () => {
  let component: CsiForumTopicComponent;
  let fixture: ComponentFixture<CsiForumTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiForumTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiForumTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
