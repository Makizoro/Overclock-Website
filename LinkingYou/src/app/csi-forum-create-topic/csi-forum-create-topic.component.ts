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

  async submitTopic(): Promise<void>{
    const topicName = (document.getElementById('topicNameInput') as HTMLInputElement).value;
    const topicMessage = (document.getElementById('topicMessageInput') as HTMLInputElement).value;

    const newForum = {csi: this.csiName, topic: topicName} as Forum;

    // const docRef = await this.forumService.addForum(newForum);

    console.log(this.forumService.getCSITopic(this.csiName));
  }
}
