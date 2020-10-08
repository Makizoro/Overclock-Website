import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../services/event.service';
import {CsiEventDetailsComponent} from '../csi-event-details/csi-event-details.component';

@Component({
  selector: 'app-csi-event',
  templateUrl: './csi-event.component.html',
  styleUrls: ['./csi-event.component.css']
})
export class CsiEventComponent implements OnInit {

  csiName: string;
  @ViewChild(CsiEventDetailsComponent)
  private csiEventDetailsComponent: CsiEventDetailsComponent;

  constructor(private router: Router, private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
  }

  public updateComponent(csiName: string): void {
    this.csiName = csiName;
    const eventDetails = document.getElementById('app-csi-event-details');
    eventDetails.style.display = 'none';
    this.displayevents();
  }

  private displayevents(): void{
    this.eventService.getEventList(this.csiName).subscribe(eventList => {
      const rootDiv = document.getElementById('eventsDiv');
      for (const csiEvent of eventList){
        const csiEventTitle = document.createElement('h3');
        csiEventTitle.innerHTML = csiEvent.name;
        csiEventTitle.style.paddingRight = '20px';
        csiEventTitle.addEventListener('click',  () => {
          this.goToEvent(csiEvent.name);
        });
        const csiEventDate = document.createElement('h6');
        csiEventDate.innerHTML = csiEvent.date;
        csiEventDate.style.color = '#707070';
        csiEventTitle.appendChild(csiEventDate);
        rootDiv.appendChild(csiEventTitle);
      }
    });


  }

  private goToEvent(eventName): void{

    const eventDetails = document.getElementById('app-csi-event-details');
    eventDetails.style.display = 'none';

    this.csiEventDetailsComponent.updateComponent(eventName)
    eventDetails.style.display = 'block';
  }
}
