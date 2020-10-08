import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiForumComponent } from './csi-forum.component';
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
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { ForumService } from '../services/forum.service';
import { Forum } from '../entities/forum.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('CsiForumComponent', () => {
  let component: CsiForumComponent;
  let fixture: ComponentFixture<CsiForumComponent>;
  let serviceR: Router;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let serviceF: ForumService;
  let forum: Forum;
  
  beforeEach(async(() => {
  
    const activatedRouteSpy = {
    queryParams: of({ tags: null }),
    ...jasmine.createSpyObj("ActivatedRoute", ["params"]),
  };
  
  TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule,
        RouterTestingModule
      ],
      providers: [ ForumService, { provide: ActivatedRoute, useValue: {
        params: of(  { name: 'csi' } )
    }
} ],
      declarations: [ CsiForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(CsiForumComponent);
    component = fixture.componentInstance;

    serviceR = TestBed.inject(Router);
    serviceF = TestBed.inject(ForumService);
    activatedRoute = TestBed.get(ActivatedRoute);
    
    forum = {
      csi: 'csi',
      topic: 'csiTopic'
    };
  
    fixture.detectChanges();
  });

  it('should nav to create topic', () => {
    const spy  = spyOn(serviceR, 'navigate');
    component.createTopic();
    expect(spy).toHaveBeenCalled();
  });

  it('should not display topics', () => {
    const spy  = spyOn(serviceF, 'getTopics').and.returnValue(of([[forum, forum.csi]]));
    document.getElementById('forumDiv').appendChild(document.createElement('h6'));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  it('should display topics', () => {
    const spy  = spyOn(serviceF, 'getTopics').and.returnValue(of([[forum, forum.csi]]));
    document.getElementById('forumDiv').appendChild(document.createElement('h6'));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

});
