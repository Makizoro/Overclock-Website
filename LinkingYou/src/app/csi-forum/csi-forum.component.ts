import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ForumService} from '../services/forum.service';

@Component({
  selector: 'app-csi-forum',
  templateUrl: './csi-forum.component.html',
  styleUrls: ['./csi-forum.component.css']
})
export class CsiForumComponent implements OnInit {

  private csiName: string;
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
      console.log('Topic list:');
      console.log(topicList);
    });
  }

  createTopic(): void {

  }
}
