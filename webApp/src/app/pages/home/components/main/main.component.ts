import { EmitterTask, InterestsCategory } from './../../../../../assets/enums';
import { UserType } from 'src/assets/enums';
import { BookingEditorComponent } from './../booking-editor/booking-editor.component';
import { EventService } from './../../../../services/event/event.service';
import { Component, OnInit, Input } from '@angular/core';
import { Event } from 'src/assets/models';
import { UserService } from 'src/app/services/user/user.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { EventEditorComponent } from '../event-editor/event-editor.component';
import { EventTypes } from 'src/assets/constants';
import { GlobalEmitterService } from 'src/app/services/global-emitter/global-emitter.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  events: Array<Event> = [];
  eventImageIndexes: Array<number> = [];
  isLoading = true;

  get isNavBarOpen(): boolean {
    return this.userService.isNavBarOpen;
  }

  get userType(): UserType {
    return this.userService.user.userType;
  }
  UserType = UserType;

  constructor(
    private eventService: EventService,
    private matDialog: MatDialog,
    private globalEmitterService: GlobalEmitterService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.globalEmitterService.emitter.subscribe((response) => {
      if (response === EmitterTask.EventCreated) {
        this.GetEvents();
      }
    });

    this.GetEvents();
  }

  GetEvents(): void {
    this.isLoading = true;
    this.eventService.GetEvents().then((response) => {
      this.events = response;
      if (this.userService.user.userType === UserType.Organizer) {
        this.events = this.events.filter((item) => {
          return item.organizerId === this.userService.user.id;
        });
      }
      this.isLoading = false;
    });
  }

  GetMomentDate(date: Date): string {
    return moment(new Date(date)).format('lll');
  }

  OpenBookingEditor(): void {
    this.matDialog.open(BookingEditorComponent, {
      height: '100vh',
      width: '100vw'
    });
  }

  OpenEventEditor(event: Event, index: number): void {
    const dialogReference = this.matDialog.open(EventEditorComponent, {
      height: '100vh',
      width: '100vw'
    });
    dialogReference.componentInstance.isEditMode = true;
    dialogReference.componentInstance.event = JSON.parse(JSON.stringify(event));

    dialogReference.afterClosed().subscribe((event: Event) => {
      if (event) {
        this.events[index] = event;
      }
    });
  }

  GetInterestName(interest): string {
    const foundAt = EventTypes.findIndex(item => InterestsCategory[interest] === item.enumValue);
    if (foundAt === -1) {
      return '';
    } else {
      return EventTypes[foundAt].text;
    }
  }


}
