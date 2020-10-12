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
  }

  public updateComponent(eventName: string): void {
    this.eventName = eventName;
    this.getEventDetails();
  }

  private getEventDetails(): void{
    this.eventService.getEvent(this.eventName).subscribe(csiEvent => {
      const eventHeader = document.getElementById('eventDetailsHeader');
      eventHeader.style.color = '#333333';
      while (eventHeader.firstChild){
        eventHeader.removeChild(eventHeader.firstChild);
      }
      const eventDateHeader = document.getElementById('eventDetailsDateHeader');
      while (eventDateHeader.firstChild){
        eventDateHeader.removeChild(eventDateHeader.firstChild);
      }
      const eventVenueHeader = document.getElementById('eventDetailsVenueHeader');
      while (eventVenueHeader.firstChild){
        eventVenueHeader.removeChild(eventVenueHeader.firstChild);
      }
      const eventCsiHeader = document.getElementById('eventDetailsCsiHeader');
      while (eventCsiHeader.firstChild){
        eventCsiHeader.removeChild(eventCsiHeader.firstChild);
      }
      const eventDescription = document.getElementById('eventDetailsDescription');
      while (eventDescription.firstChild){
        eventDescription.removeChild(eventDescription.firstChild);
      }
      const csiEventData = csiEvent[0];
      eventHeader.innerHTML = csiEventData.name;
      const eventDateDetails = document.createElement('h7');
      eventDateDetails.innerHTML = csiEventData.date;
      eventDateHeader.appendChild(eventDateDetails);
      const eventVenueDetails = document.createElement('h7');
      eventVenueDetails.innerHTML = csiEventData.venue;
      eventVenueHeader.appendChild(eventVenueDetails);
      const eventCsiDetails = document.createElement('h7');
      eventCsiDetails.innerHTML = csiEventData.csi;
      eventCsiHeader.appendChild(eventCsiDetails);
      const breakDiv = document.createElement('br');
      eventDescription.appendChild(breakDiv);
      const eventDescriptionDetails = document.createElement('p');
      eventDescriptionDetails.innerHTML = csiEventData.description;
      eventDescription.appendChild(eventDescriptionDetails);
    });
  }

  eventPopUpClose(): void{
    // const csiPageCancel = document.getElementById('cancels');
    // csiPageCancel.click();
    const csiPage = document.getElementById('app-csi-event-details');
    const welcomePage = document.getElementById('app-csi-event');

    try{
      if (csiPage.style.display === 'block'){
        csiPage.style.display = 'none';
      }
    } catch (e) {
      // will run if csi page is closed in the dashboard. This is expected behaviour and will run every time
    }
    try{
      if (welcomePage.style.display === 'block'){
        welcomePage.style.display = 'none';
      }

    } catch (e) {
      // will run if csi page is closed in csi tabs. This is expected behaviour and will run every time
    }
  }

}
