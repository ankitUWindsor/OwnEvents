import { EventBookingsComponent } from './../event-bookings/event-bookings.component';
import { Router } from '@angular/router';
import { AssetService } from 'src/app/services/asset.service';
import { EmitterTask, InterestsCategory } from './../../../../../assets/enums';
import { UserType } from 'src/assets/enums';
import { BookingEditorComponent } from './../booking-editor/booking-editor.component';
import { EventService } from 'src/app/services/event/event.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Event } from 'src/assets/models';
import { UserService } from 'src/app/services/user/user.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { EventEditorComponent } from '../event-editor/event-editor.component';
import { EventTypes } from 'src/assets/constants';
import { GlobalEmitterService } from 'src/app/services/global-emitter/global-emitter.service';
import { Subscription } from 'rxjs';
import { ArViewerComponent } from '../ar-viewer/ar-viewer.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  events: Array<Event> = [];
  isLoading = true;
  showMyInterests: boolean;

  get isNavBarOpen(): boolean {
    return this.userService.isNavBarOpen;
  }

  get userType(): UserType {
    return this.userService.user.userType;
  }
  UserType = UserType;
  searchText = '';
  imageIndexes: Array<number> = [];
  CatcherObservable: Subscription;

  constructor(
    private eventService: EventService,
    private matDialog: MatDialog,
    private router: Router,
    public assetService: AssetService,
    private globalEmitterService: GlobalEmitterService,
    private userService: UserService) { }

  ngOnDestroy(): void {
    this.CatcherObservable.unsubscribe();
  }

  ngOnInit(): void {
    this.CatcherObservable = this.globalEmitterService.catcher.subscribe((response) => {
      if (response === EmitterTask.EventCreated) {
        this.GetEvents();
        this.searchText = '';
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
      this.events.sort((a, b) => this.CompareMomentDates(a.createdDate, b.createdDate));
      this.imageIndexes = new Array(this.events.length).fill(0);

      this.isLoading = false;
    });
  }

  CompareMomentDates(firstDate, secondDate): number {
    if (moment(firstDate).isAfter(moment(secondDate))) {
      return -1;
    } else {
      return 1;
    }
  }

  GetMomentDate(date: Date): string {
    return moment(new Date(date)).format('lll');
  }

  OpenBookingEditor(eventId: string): void {
    const dialogInstance = this.matDialog.open(BookingEditorComponent, {
      height: '100vh',
      width: '100vw'
    });
    dialogInstance.componentInstance.eventId = eventId;
    dialogInstance.afterClosed().subscribe((response) => {
      if (response) {
        this.GetEvents();
      }
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

  CheckIfSearchTextExists(name: string): boolean {
    return name.toLowerCase().includes(this.searchText.trim().toLowerCase());
  }

  CheckIfInterestMatches(interests: Array<InterestsCategory>): boolean {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < interests.length; i++) {
      if (this.userService.user.interests.includes(interests[i])) {
        return true;
      }
    }
    return false;
  }

  MoveImage(index: number, count: number): void {
    const nextImageIndex = this.imageIndexes[index] + count;

    if (nextImageIndex < 0) {
      this.imageIndexes[index] = this.events[index].images.length - 1;
    } else if (nextImageIndex >= this.events[index].images.length) {
      this.imageIndexes[index] = 0;
    } else {
      this.imageIndexes[index] = nextImageIndex;
    }
  }

  CancelEvent(event: Event, index: number): void {
    this.isLoading = true;
    this.eventService.DeleteEvent(event.id).then(() => {
      this.events.splice(index, 1);
      this.imageIndexes.splice(index, 1);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  CheckIfAlreadyBooked(event: Event): boolean {
    return event.participantIds.includes(this.userService.user.id);
  }

  ShowBookings(item): void {
    const dialogInstance = this.matDialog.open(EventBookingsComponent, {
      height: '100vh',
      width: '100vw'
    });
    dialogInstance.componentInstance.event = item;
  }

  OpenLiveView(name: string){
    const reference = this.matDialog.open(ArViewerComponent, {
      height: '100vh',
      width: '100vw'
    });
    reference.componentInstance.urlForSrc = environment.publicStorage + name;
  }

}
