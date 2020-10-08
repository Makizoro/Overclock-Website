import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ForumService} from '../services/forum.service';
import {Forum} from '../entities/forum.model';
import {CsiForumTopicComponent} from '../csi-forum-topic/csi-forum-topic.component';
import {CsiForumCreateTopicComponent} from '../csi-forum-create-topic/csi-forum-create-topic.component';
import {create} from 'domain';

@Component({
  selector: 'app-csi-forum',
  templateUrl: './csi-forum.component.html',
  styleUrls: ['./csi-forum.component.css']
})
export class CsiForumComponent implements OnInit {

  private csiName: string;
  private topicList: any;
  @ViewChild(CsiForumTopicComponent)
  private csiForumTopicComponent: CsiForumTopicComponent;
  @ViewChild(CsiForumCreateTopicComponent)
  private csiForumCreateTopicComponent: CsiForumCreateTopicComponent;

  constructor(private route: ActivatedRoute, private router: Router, private forumService: ForumService) { }

  ngOnInit(): void {
  }

  public updateComponent(name): void {
    this.csiName = name;
    const topicForum = document.getElementById('app-csi-forum-topic');
    topicForum.style.display = 'none';
    const createTopic = document.getElementById('app-csi-forum-create-topic');
    createTopic.style.display = 'none';
    this.retrieveTopics();
  }

  private retrieveTopics(): void {
    this.forumService.getTopics().subscribe(topicList => {
      this.topicList = topicList;

      this.displayTopics();
    });
  }

  public createTopic(): void {
    const forumTopic = document.getElementById('app-csi-forum-topic');
    forumTopic.style.display = 'none';
    this.csiForumCreateTopicComponent.updateComponent(this.csiName);
    const createTopic = document.getElementById('app-csi-forum-create-topic');
    createTopic.style.display = 'block';
  }

  private displayTopics(): void {
    const forumDiv = document.getElementById('forumDiv');
    while (forumDiv.firstChild){
      forumDiv.removeChild(forumDiv.firstChild);
    }

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
    const createTopic = document.getElementById('app-csi-forum-create-topic');
    createTopic.style.display = 'none';
    this.csiForumTopicComponent.updateComponent(topicId);
    const forumTopic = document.getElementById('app-csi-forum-topic');
    forumTopic.style.display = 'block';
  }
}
