import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-csi-forum-topic',
  templateUrl: './csi-forum-topic.component.html',
  styleUrls: ['./csi-forum-topic.component.css']
})
export class CsiForumTopicComponent implements OnInit {

  topicHash: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {try{
    this.route.params.subscribe(params => this.topicHash = params.topicHash);
  } catch (e) {
    this.router.navigate(['/sidebar', {outlets: {routerSidebar: 'csi'}}]);
  }
  }

}
