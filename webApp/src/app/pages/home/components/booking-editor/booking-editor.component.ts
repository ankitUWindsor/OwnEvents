import { BookingService } from './../../../../services/booking/booking.service';
import { EventService } from 'src/app/services/event/event.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import { Booking, Event } from 'src/assets/models';

@Component({
  selector: 'app-booking-editor',
  templateUrl: './booking-editor.component.html',
  styleUrls: ['./booking-editor.component.scss']
})
export class BookingEditorComponent implements OnInit {
  @Input() booking: Booking;
  @Input() isEditMode = false;
  @Input() eventId: string;
  event: Event;

  isLoading: boolean;
  isInitialLoading = false;
  errorMessage: string;
  errorFromBackEnd: boolean;
  isTryingToSubmit: boolean;
  constructor(
    private bookingService: BookingService,
    private eventService: EventService,
    private dialogRef: MatDialogRef<BookingEditorComponent>,
    private userService: UserService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.isInitialLoading = true;

    this.eventService.GetEventById(this.eventId).then((response) => {
      this.event = response;
      if (!this.isEditMode) {
        this.booking = new Booking();
        this.booking.name = this.userService.user.name;
        this.booking.email = this.userService.user.email;
        this.booking.seatCount = 1;
        this.booking.eventId = this.eventId;
      }
    }).finally(() => {
      this.isInitialLoading = false;
      this.isLoading = false;
    });
  }

  CloseDialog(booking = null): void {
    this.dialogRef.close(booking);
  }

  CreateUpdateBooking(): void {
    this.isTryingToSubmit = true;
    if (this.CheckFormValidation()) {
      this.isLoading = true;
      if (!this.isEditMode) {
        this.bookingService.CreateBooking(this.booking).then((response) => {
          this.CloseDialog(response);
        }).finally(() => {
          this.isLoading = false;
        });
      } else {
        this.bookingService.UpdateBooking(this.booking).then((response) => {
          this.CloseDialog(response);
        }).finally(() => {
          this.isLoading = false;
        });
      }
    }
  }

  ChangeSeatCount(count: number): void {
    const availableSeats = this.event.capacity - this.event.participantIds.length;
    if (availableSeats >= (this.booking.seatCount + count) && (this.booking.seatCount + count) !== 0) {
      this.booking.seatCount += count;
    }
  }

  CheckFormValidation(): boolean {

    if (!this.isInitialLoading)
     {
      this.errorMessage = '';
      if (!this.booking.name.trim().length || !this.booking.email.trim().length) {
        this.errorMessage = 'Please fill all the fields';
      }
      return this.errorMessage.length === 0;
    } else {
      return false;
    }
  }

  RoundNumber(num: number){
    return num.toFixed(2);
  }
}
