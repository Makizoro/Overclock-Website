import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Forum} from '../entities/forum.model';
import {ForumService} from '../services/forum.service';
import {CookieService} from 'ngx-cookie-service';
import {MessageService} from '../services/message.service';
import {Message} from '../entities/message.model';

@Component({
  selector: 'app-csi-forum-create-topic',
  templateUrl: './csi-forum-create-topic.component.html',
  styleUrls: ['./csi-forum-create-topic.component.css']
})
export class CsiForumCreateTopicComponent implements OnInit {

  csiName: string;
  username: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private forumService: ForumService,
    private messageService: MessageService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  public updateComponent(csiName: string): void {
    this.csiName = csiName;
  }

  async submitTopic(): Promise<void>{
    if (this.cookieService.check('username')){
      this.username = this.cookieService.get('username');
    } else {
      return;
    }
    const topicName = (document.getElementById('topicNameInput') as HTMLInputElement).value;
    const topicMessage = (document.getElementById('topicMessageInput') as HTMLInputElement).value;
    (document.getElementById('topicNameInput') as HTMLInputElement).value = '';
    (document.getElementById('topicMessageInput') as HTMLInputElement).value = '';

    const newForum = {csi: this.csiName, topic: topicName} as Forum;

    this.forumService.addForum(newForum);

    let docId: string;

    this.forumService.getACSITopic(this.csiName, topicName).subscribe(data => {
      docId = data[1];
      console.log(data);
    });

    const message = {message: topicMessage, timestamp: 'Date', username: this.username} as Message;

    this.messageService.addMessage(docId, message);

    const myDiv = document.getElementById('app-csi-forum-create-topic');
    myDiv.style.display = 'none';

  }
}
