import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiForumCreateTopicComponent } from './csi-forum-create-topic.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';
import { AppRouteModule } from '../app.route';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../services/message.service';
import { ForumService } from '../services/forum.service';
import { Forum } from '../entities/forum.model';
import { Message } from '../entities/message.model';

describe('CsiForumCreateTopicComponent', () => {
  let component: CsiForumCreateTopicComponent;
  let fixture: ComponentFixture<CsiForumCreateTopicComponent>;
  let serviceR: Router;
  let serviceActR: ActivatedRoute;
  let serviceC: CookieService;
  let serviceM: MessageService;
  let serviceF: ForumService;
  let forum: Forum;
  let message: Message;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule,
        RouterTestingModule
      ],
      providers: [ ForumService, CookieService, MessageService ],
      declarations: [ CsiForumCreateTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiForumCreateTopicComponent);
    component = fixture.componentInstance;

    serviceR = TestBed.inject(Router);
    serviceF = TestBed.inject(ForumService);
    serviceM = TestBed.inject(MessageService);
    serviceC = TestBed.inject(CookieService);
    serviceActR = TestBed.inject(ActivatedRoute);

    message = {
      message: 'message',
      timestamp: '01/01/2020',
      username: 'username'
    };

    forum = {
      csi: 'csi',
      topic: 'csiTopic'
    };
  });

  it('should submit topic', () => {
    const spy  = spyOn(serviceC, 'check').and.returnValue(false);
    component.submitTopic();
    expect(spy).toHaveBeenCalled();
  });

  it('should create', () => {
    //const spy = spyOn(serviceActR.params, 'subscribe');
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should submit topic cookie true', () => {
    const spy  = spyOn(serviceC, 'check').and.returnValue(true);
    spyOn(serviceC, 'get').and.returnValue(message.username);
    spyOn(serviceF, 'addForum');
    spyOn(serviceF, 'getACSITopic').and.returnValue(of([forum, 'forumiId']));

    spyOn(serviceM, 'addMessage');
    spyOn(serviceR, 'navigate');

    (document.getElementById('topicNameInput') as HTMLInputElement).value = forum.csi;
    (document.getElementById('topicMessageInput') as HTMLInputElement).value = message.message;

    component.submitTopic();
    expect(spy).toHaveBeenCalled();
  });
});
