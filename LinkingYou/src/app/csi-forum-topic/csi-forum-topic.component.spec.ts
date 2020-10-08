import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { CsiForumTopicComponent } from './csi-forum-topic.component';

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
import { Router } from '@angular/router';
import { ForumService } from '../services/forum.service';
import { MessageService } from '../services/message.service';
import { CookieService } from 'ngx-cookie-service';
import { Message } from '../entities/message.model';
import { Forum } from '../entities/forum.model';

describe('CsiForumTopicComponent', () => {
  let component: CsiForumTopicComponent;
  let fixture: ComponentFixture<CsiForumTopicComponent>;
  let serviceR: Router;
  let serviceF: ForumService;
  let serviceM: MessageService;
  let serviceC: CookieService;
  let message: Message;
  let forum: Forum;

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
      declarations: [ CsiForumTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiForumTopicComponent);
    component = fixture.componentInstance;

    serviceR = TestBed.inject(Router);
    serviceF = TestBed.inject(ForumService);
    serviceM = TestBed.inject(MessageService);
    serviceC = TestBed.inject(CookieService);

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

  it('should initiate', () => {
    const spy = spyOn(serviceF, 'getTopic').and.returnValue(of(forum));
    spyOn(serviceM, 'getMessage').and.returnValue(of([[message, message.username]]));
    spyOn(serviceC, 'check').and.returnValue(true);
    spyOn(serviceC, 'get').and.returnValue(message.username);

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should initiate cookie check false', () => {
    const spy = spyOn(serviceF, 'getTopic').and.returnValue(of(forum));
    spyOn(serviceM, 'getMessage').and.returnValue(of([[message, message.username]]));
    spyOn(serviceC, 'check').and.returnValue(false);
    spyOn(serviceR, 'navigate');  

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should initiate', fakeAsync(() => {
    const spy = spyOn(serviceM, 'addMessage').and.returnValue(Promise.resolve());

    (document.getElementById('topicMessageInput') as HTMLInputElement).value = message.message;

    component.sendMessage();

    expect(spy).toHaveBeenCalled();
  }));
});
