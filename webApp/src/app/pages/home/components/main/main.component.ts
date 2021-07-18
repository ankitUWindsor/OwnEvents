import { BookingEditorComponent } from './../booking-editor/booking-editor.component';
import { EventService } from './../../../../services/event/event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/assets/models';
import { UserService } from 'src/app/services/user/user.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  events: Array<Event> = [];
  isLoading = true;

  get isNavBarOpen(): boolean {
    return this.userService.isNavBarOpen;
  }
  constructor(
    private eventService: EventService,
    private matDialog: MatDialog,
    private userService: UserService) { }

  ngOnInit(): void {
    this.GetEvents();
  }

  GetEvents(): void {
    this.isLoading = true;
    this.eventService.GetEvents().then((response) => {
      this.events = response;
      this.isLoading = false;
    });
  }

  GetMomentDate(date: Date): string {
    return moment(new Date()).format('llll');
  }

  OpenBookingEditor(): void {
    this.matDialog.open(BookingEditorComponent, {
      height: '100vh',
      width: '100vw'
    });
  }

}
