import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  data: any = {};
  routeState: any;

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation().extras.state){
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.data.username = this.routeState.username;
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {
  }

}
