import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../services/event.service';

@Component({
  selector: 'app-csi-event-details',
  templateUrl: './csi-event-details.component.html',
  styleUrls: ['./csi-event-details.component.css']
})
export class CsiEventDetailsComponent implements OnInit {

  eventName: string;

  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService) { }

  ngOnInit(): void {
    try{
      this.route.params.subscribe(params => this.eventName = params.eventName);
      this.getEventDetails();
    } catch (e) {
      this.router.navigate(['/sidebar', {outlets: {routerSidebar: 'csi'}}]);
    }
  }

  private getEventDetails(): void{
    this.eventService.getEvent(this.eventName).subscribe(csiEvent => {
      const eventHeader = document.getElementById('eventHeader');
      const eventDateHeader = document.getElementById('eventDateHeader');
      const eventVenueHeader = document.getElementById('eventVenueHeader');
      const eventCsiHeader = document.getElementById('eventCsiHeader');
      const eventDescription = document.getElementById('eventDescription');
      eventHeader.innerHTML = csiEvent.name;
      const eventDateDetails = document.createElement('h7');
      eventDateDetails.innerHTML = csiEvent.description;
      eventDateHeader.appendChild(eventDateDetails);
      const eventVenueDetails = document.createElement('7');
      eventVenueDetails.innerHTML = csiEvent.venue;
      eventVenueHeader.appendChild(eventVenueDetails);
      const eventCsiDetails = document.createElement('h7');
      eventCsiDetails.innerHTML = csiEvent.csi;
      eventCsiHeader.appendChild(eventCsiDetails);
      const breakDiv = document.createElement('br');
      eventDescription.appendChild(breakDiv);
      const eventDescriptionDetails = document.createElement('p');
      eventDescriptionDetails.innerHTML = csiEvent.description;
      eventDescription.appendChild(eventDescriptionDetails);
    });
  }

}
