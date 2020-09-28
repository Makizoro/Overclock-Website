import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Forum} from '../entities/forum.model';
import {ForumService} from '../services/forum.service';
import {MessageService} from '../services/message.service';
import {Message} from '../entities/message.model';


@Component({
  selector: 'app-csi-forum-topic',
  templateUrl: './csi-forum-topic.component.html',
  styleUrls: ['./csi-forum-topic.component.css']
})
export class CsiForumTopicComponent implements OnInit {

  topicHash: string;
  topicName: string;
  messageList: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private forumService: ForumService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    try {
      this.route.params.subscribe(params => {
        this.topicHash = params.topicHash;
        this.forumService.getTopic(this.topicHash).subscribe(topic => {
          this.topicName = topic.topic;
        });
        this.messageService.getMessage(this.topicHash).subscribe(messageList => {
          this.messageList = messageList;
          this.displayTopic();
        });
      });
    } catch (e) {
      console.log(e);
      this.router.navigate(['/sidebar', {outlets: {routerSidebar: 'csi'}}]);
    }
  }

  private displayTopic(): void {
    const topicDiv = document.getElementById('topicDiv');
    const topicHeader = document.createElement('h5');
    topicHeader.innerHTML = this.topicName;
    topicDiv.appendChild(topicHeader);
    for (const message of this.messageList){
      console.log(message);

      const messageDiv = document.createElement('div');
      const usernameHeader = document.createElement('h7');
      usernameHeader.innerHTML = message.username;
      const messageHeader = document.createElement('p');
      messageHeader.innerHTML = message.message;
      const breakDiv = document.createElement('br');
      messageDiv.appendChild(usernameHeader);
      messageDiv.appendChild(breakDiv);
      messageDiv.appendChild(messageHeader);

      topicDiv.appendChild(messageDiv);

    }

  }
}
