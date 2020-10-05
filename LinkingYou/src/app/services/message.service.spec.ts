import { fakeAsync, TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

import { By } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import {AuthService} from '../services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';
import { AppRouteModule } from '../app.route';
import { Message } from '../entities/message.model';

describe('MessageService', () => {
  let service: MessageService;
  let message: Message;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRouteModule,
        FormsModule
      ],
    });
    service = TestBed.inject(MessageService);

    message = {
      message: 'message',
      timestamp: '01/01/2020',
      username: 'username'
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add message', fakeAsync(() => {
    const spy = spyOn(service,'addMessage').and.returnValue(Promise.resolve());
    service.addMessage('id',message);
    expect(spy).toHaveBeenCalled();
  }));

  it('should get csi message from topic', fakeAsync(() => {
    const spy = spyOn(service,'getCSIMessage').and.returnValue([message ,message]);
    service.getCSIMessage('id','csiName');
    expect(spy).toHaveBeenCalled();
  }));

  it('should get messages from topic', fakeAsync(() => {
    const spy = spyOn(service,'getMessage').and.returnValue([message, message]);
    service.getMessage('id');
    expect(spy).toHaveBeenCalled();
  }));
});
