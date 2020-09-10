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

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    if (this.router.getCurrentNavigation().extras.state){
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.data.username = this.routeState.username;
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  viewProfile(): void{
    console.log(this.router);
    this.router.navigate([{outlets: { routerSidebar: ['userPage'] } }], {state: {username: this.data.username}, });
  }

  sidebarClose(): void{
    const sidebarCancel = document.getElementById('cancel');
    sidebarCancel.click();
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  public logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/login');
  }

}


