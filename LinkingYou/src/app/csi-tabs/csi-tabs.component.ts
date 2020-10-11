import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CsiService} from '../services/csi.service';
import {CsiPageComponent} from '../csi-page/csi-page.component';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-csi-tabs',
  templateUrl: './csi-tabs.component.html',
  styleUrls: ['./csi-tabs.component.css']
})
export class CsiTabsComponent implements OnInit {

  data: any = {};

  @ViewChild(CsiPageComponent)
  private csiPageComponent: CsiPageComponent;
  // The constructor needs to retrieve all CSI names and descriptions. Then, add a div which has the CSI names and descriptions with
  // an onClick method that navigates to the csiPage (CSI profile page) with the csi name as a route parameter
  constructor(
    private csiService: CsiService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {

    const popup = document.getElementById('popupCSIpage');
    popup.style.display = 'none';

    this.csiService.getCSI().subscribe(data => {
      this.data = data;
      this.displayCSIData(this.data);
    });
  }

  navigateToCSI: EventListener = (e) => {
    const temp = e.composedPath()[1] as HTMLDivElement;
    const csiName = temp.id;

    // this.router.navigate([ { outlets: {routerSidebar: 'csiPage/' + csiName} } ], { relativeTo: this.route.parent });
    this.csiPageComponent.updateCsiPage(csiName, 'popupCSIpage');
  }

  displayCSIData(data): void{
    const c = document.getElementById('clubList');
    while (c.firstChild){
      c.removeChild(c.firstChild);
    }
    const s = document.getElementById('societyList');
    while (s.firstChild){
      s.removeChild(s.firstChild);
    }
    const ig = document.getElementById('interestGroupList');
    while (ig.firstChild){
      ig.removeChild(ig.firstChild);
    }

    for (const csi of data){
      const newDiv = document.createElement('div');
      newDiv.id = (csi.name);
      const csiTitle = document.createElement('h5');
      csiTitle.innerHTML = csi.name;
      csiTitle.addEventListener('click', this.navigateToCSI);
      newDiv.appendChild(csiTitle);
      const csiDescription = document.createElement('p');
      csiDescription.innerHTML = csi.description;
      csiDescription.addEventListener('click', this.navigateToCSI);
      newDiv.appendChild(csiDescription);
      switch (csi.type){
        case 'Club': {
          c.appendChild(newDiv);
          break;
        }
        case 'Society': {
          s.appendChild(newDiv);
          break;
        }
        case 'Interest Group': {
          ig.appendChild(newDiv);
          break;
        }
      }
    }
  }
}
