import { BookingService } from './../../../../services/booking/booking.service';
import { Event, Booking } from './../../../../../assets/models';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-bookings',
  templateUrl: './event-bookings.component.html',
  styleUrls: ['./event-bookings.component.scss']
})
export class EventBookingsComponent implements OnInit {
  @Input() event: Event;
  isloading = false;
  bookingsList: Array<Booking> = [];
  constructor(
    private bookingService: BookingService,
    private dialogRef: MatDialogRef<EventBookingsComponent>) { }

  ngOnInit(): void {
    if (this.event && this.event.id) {
      this.isloading = true;
      this.bookingService.GetBookingsByEventId(this.event.id).then((response) => {
        this.bookingsList = response;
        this.isloading = false;
      }, (err) => {
        this.isloading = false;
        console.error(err);
      });
    } else {
      this.CloseDialog();
    }
  }

  CloseDialog(booking = null): void {
    this.dialogRef.close();
  }

}
