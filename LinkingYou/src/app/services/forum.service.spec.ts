import { fakeAsync, TestBed } from '@angular/core/testing';
import { ForumService } from './forum.service';
import {DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';
import { AppRouteModule } from '../app.route';
import { Forum } from '../entities/forum.model';
import { from } from 'rxjs';

describe('ForumService', () => {
  let service: ForumService;
  let forum: Forum;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule
      ]
    });
    service = TestBed.inject(ForumService);

    forum = {
      csi: 'csi',
      topic: 'csiTopic'
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a forum', fakeAsync(() => {
    const spy = spyOn(service,'addForum');
    service.addForum(forum);
    expect(spy).toHaveBeenCalled();
  }));

  it('should get topcis made by csi', fakeAsync(() => {
    const spy = spyOn(service,'getCSITopic').and.returnValue(forum);
    service.getCSITopic(forum.csi);
    expect(spy).toHaveBeenCalled();
  }));

  it('should get topci given by id', fakeAsync(() => {
    const spy = spyOn(service,'getTopic').and.returnValue(forum);
    service.getTopic(forum.topic);
    expect(spy).toHaveBeenCalled();
  }));

  it('should get topcis', fakeAsync(() => {
    const spy = spyOn(service,'getTopics').and.returnValue([forum, forum]);
    service.getTopics();
    expect(spy).toHaveBeenCalled();
  }));
});
