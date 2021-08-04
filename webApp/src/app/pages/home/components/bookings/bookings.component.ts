import { BookingEditorComponent } from './../booking-editor/booking-editor.component';
import { AssetService } from './../../../../services/asset.service';
import { BookingService } from './../../../../services/booking/booking.service';
import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/assets/models';
import { InterestsCategory, UserType } from 'src/assets/enums';
import { UserService } from 'src/app/services/user/user.service';
import { EventTypes } from 'src/assets/constants';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings: Array<Booking> = [];
  isLoading: boolean;

  get isNavBarOpen(): boolean {
    return this.userService.isNavBarOpen;
  }

  get userType(): UserType {
    return this.userService.user.userType;
  }
  UserType = UserType;
  searchText = '';
  imageIndexes: Array<number> = [];

  constructor(
    private matDialog: MatDialog,
    public assetService: AssetService,
    private bookingService: BookingService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.GetBookings();
  }

  GetBookings(): void {
    this.isLoading = true;
    this.bookingService.GetAllBookings().then((response) => {
      this.bookings = response;
      this.bookings = this.bookings.filter((item) => {
        return !item.isCanceled;
      });

      this.bookings.sort((a, b) => this.CompareMomentDates(a.createdDate, b.createdDate));
      this.imageIndexes = new Array(this.bookings.length).fill(0);
    }).finally(() => {
      this.isLoading = false;
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

  MoveImage(index: number, count: number): void {
    const nextImageIndex = this.imageIndexes[index] + count;

    if (nextImageIndex < 0) {
      this.imageIndexes[index] = this.bookings[index].event.eventImages.length - 1;
    } else if (nextImageIndex >= this.bookings[index].event.eventImages.length) {
      this.imageIndexes[index] = 0;
    } else {
      this.imageIndexes[index] = nextImageIndex;
    }
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

  CancelBooking(item: Booking, index: number): void {
    this.isLoading = true;
    this.bookingService.CancelBooking(item.id).then((response) => {
      this.bookings.splice(index, 1);
      this.imageIndexes.splice(index, 1);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  CheckIfInterestMatches(interest: InterestsCategory): boolean {
    return this.userService.user.interests.includes(interest);
  }

  OpenBookingEditor(booking: Booking, index: number): void {
    const dialogReference = this.matDialog.open(BookingEditorComponent, {
      height: '100vh',
      width: '100vw'
    });
    dialogReference.componentInstance.isEditMode = true;
    dialogReference.componentInstance.eventId = booking.eventId;
    dialogReference.componentInstance.booking = JSON.parse(JSON.stringify(booking));

    dialogReference.afterClosed().subscribe((booking: Booking) => {
      if (booking) {
        this.bookings[index] = booking;
      }
    });
  }

}
