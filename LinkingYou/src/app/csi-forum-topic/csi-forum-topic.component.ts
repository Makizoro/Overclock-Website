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
  messageList: Message;

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
      });
      this.messageService.getMessage(this.topicHash).subscribe(messageList => {
        this.messageList = messageList;
      });
      this.displayTopic();
    } catch (e) {
      console.log(e);
      this.router.navigate(['/sidebar', {outlets: {routerSidebar: 'csi'}}]);
    }
  }

  private displayTopic(): void {

  }
}
