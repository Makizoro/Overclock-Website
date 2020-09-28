import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ForumService} from '../services/forum.service';
import {Forum} from '../entities/forum.model';

@Component({
  selector: 'app-csi-forum',
  templateUrl: './csi-forum.component.html',
  styleUrls: ['./csi-forum.component.css']
})
export class CsiForumComponent implements OnInit {

  private csiName: string;
  private topicList: any;
  private csiTopic: any;
  constructor(private route: ActivatedRoute, private router: Router, private forumService: ForumService) { }

  ngOnInit(): void {
    try{
      this.route.params.subscribe(params => this.csiName = params.name);
    } catch (e) {
      this.router.navigate(['/sidebar', {outlets: {routerSidebar: 'csi'}}]);
    }

    this.retrieveTopics();
  }

  private async retrieveTopics(): Promise<void> {
    this.forumService.getTopics().subscribe(topicList => {
      this.topicList = topicList;

      this.displayTopics();
    });
  }

  createTopic(): void {
    this.router.navigate([{outlets: {routerForum: 'csiForumCreateTopic/' + this.csiName}}], {relativeTo: this.route.parent});
  }

  private displayTopics(): void {
    const forumDiv = document.getElementById('forumDiv');

    for (const topic of this.topicList){
      try {
        const thisTopic = topic[0] as Forum;
        if (thisTopic.csi !== this.csiName){
          continue;
        }
        const topicId = topic[1];
        const topicDiv = document.createElement('div');
        const topicTitle = document.createElement('h6');
        topicTitle.innerHTML = thisTopic.topic;
        topicTitle.addEventListener('click', () => {
          this.goToTopic(topicId);
        });
        topicDiv.appendChild(topicTitle);
        forumDiv.appendChild(topicDiv);
      } catch (e) {
        break;
      }
    }
  }

  private goToTopic(topicId): void{

    this.router.navigate([{outlets: {routerForum: 'csiForumTopic/' + topicId}}], {relativeTo: this.route.parent});
  }
}
