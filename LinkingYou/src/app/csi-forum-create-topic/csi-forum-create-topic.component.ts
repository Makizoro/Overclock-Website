import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Forum} from '../entities/forum.model';
import {ForumService} from '../services/forum.service';
import {CookieService} from 'ngx-cookie-service';

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
    private forumService: ForumService) { }

  ngOnInit(): void {
    try{
      this.route.params.subscribe(params => this.csiName = params.name);
    } catch (e) {
      this.router.navigate(['/sidebar', {outlets: {routerSidebar: 'csi'}}]);
    }
  }

  submitTopic(): void{
    const topicName = (document.getElementById('topicNameInput') as HTMLInputElement).value;
    const topicMessage = (document.getElementById('topicMessageInput') as HTMLInputElement).value;

    let newForum: Forum;
    newForum.csi = this.csiName;
    newForum.topic = topicName;

    // this.forumService.addForum();
  }
}
