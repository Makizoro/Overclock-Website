import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Forum} from '../entities/forum.model';
import {ForumService} from '../services/forum.service';
import {MessageService} from '../services/message.service';
import {Message} from '../entities/message.model';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-csi-forum-topic',
  templateUrl: './csi-forum-topic.component.html',
  styleUrls: ['./csi-forum-topic.component.css']
})
export class CsiForumTopicComponent implements OnInit {

  topicHash: string;
  topicName: string;
  messageList: any;
  username: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private forumService: ForumService,
              private messageService: MessageService,
              private cookieService: CookieService) { }

  ngOnInit(): void {

  }

  public updateComponent(topicId: string): void {
    try {
        this.topicHash = topicId;
        this.forumService.getTopic(this.topicHash).subscribe(topic => {
          this.topicName = topic.topic;
        });
        if (this.cookieService.check('username')){
          this.username = this.cookieService.get('username');

        }
        this.getMessages();
    } catch (e) {
      console.log(e);
    }
  }

  private getMessages(): void {
    this.messageService.getMessage(this.topicHash).subscribe(messageList => {
      this.messageList = messageList;
      this.displayTopic();

    });
  }

  private displayTopic(): void {
    const topicDiv = document.getElementById('topicDiv');
    while (topicDiv.firstChild){
      topicDiv.removeChild(topicDiv.firstChild);
    }
    const topicHeader = document.createElement('h3');
    topicHeader.innerHTML = this.topicName;
    topicDiv.appendChild(topicHeader);
    for (const message of this.messageList){

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

  async sendMessage(): Promise<void> {
    const topicMessageInput = (document.getElementById('topicMessageInput') as HTMLInputElement).value;
    const message = {message: topicMessageInput, timestamp: 'Date', username: this.username} as Message;

    // console.log(message);
    await this.messageService.addMessage(this.topicHash, message);
    this.refreshPage();
  }

  private refreshPage(): void {
    const topicDiv = document.getElementById('topicDiv');
    while (topicDiv.firstChild){
      topicDiv.removeChild(topicDiv.firstChild);
    }
    const topicMessageInput = (document.getElementById('topicMessageInput') as HTMLTextAreaElement);
    topicMessageInput.value = '';
    // this.getMessages();
  }
}
