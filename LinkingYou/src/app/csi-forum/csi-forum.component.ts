import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-csi-forum',
  templateUrl: './csi-forum.component.html',
  styleUrls: ['./csi-forum.component.css']
})
export class CsiForumComponent implements OnInit {

  csiName: string;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    try{
      this.route.params.subscribe(params => this.csiName = params.name);
    } catch (e) {
      this.router.navigate(['/sidebar', {outlets: {routerSidebar: 'csi'}}]);
    }
  }

}
