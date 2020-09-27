import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../services/event.service';

@Component({
  selector: 'app-csi-event',
  templateUrl: './csi-event.component.html',
  styleUrls: ['./csi-event.component.css']
})
export class CsiEventComponent implements OnInit {

  csiName: string;
  constructor(private router: Router, private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    try{
      this.route.params.subscribe(params => this.csiName = params.name);
      this.displayevents();

    } catch (e) {
      this.router.navigate(['/sidebar', {outlets: {routerSidebar: 'csi'}}]);
    }
  }

  private displayevents(): void{
    this.eventService.getEventList(this.csiName).subscribe(eventList => {
      const rootDiv = document.getElementById('root');
      for (const csiEvent of eventList){
        const csiEventTitle = document.createElement('h4');
        csiEventTitle.innerHTML = csiEvent.name;
        csiEventTitle.addEventListener('click',  () => {
          this.goToEvent(csiEvent.name);
        });
        const csiEventDate = document.createElement('p');
        csiEventDate.innerHTML = csiEvent.date;
        csiEventTitle.appendChild(csiEventDate);
        rootDiv.appendChild(csiEventTitle);
      }
    });


  }

  private goToEvent(eventName): void{
    this.router.navigate(['csiEventDetails/' + eventName], {relativeTo: this.route});
  }
}
