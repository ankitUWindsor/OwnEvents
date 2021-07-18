import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-editor',
  templateUrl: './booking-editor.component.html',
  styleUrls: ['./booking-editor.component.scss']
})
export class BookingEditorComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<BookingEditorComponent>) { }

  ngOnInit(): void {
  }

  CloseDialog(): void {
    this.dialogRef.close();
  }

  CreateUpdateBooking(): void {

  }


}
