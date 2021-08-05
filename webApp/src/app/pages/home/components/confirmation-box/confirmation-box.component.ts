import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.scss']
})
export class ConfirmationBoxComponent implements OnInit {
  isloading: boolean;
  @Input() message = 'Are you sure you want to continue!!';
  @Input() header = 'Confirmation';
  @Input() confirmButton = 'Confirm';
  @Input() cancelButton = 'cancel';

  constructor(private dialogRef: MatDialogRef<ConfirmationBoxComponent>) { }

  ngOnInit(): void {
  }

  CloseDialog(isConfirmed = false): void {
    this.dialogRef.close(isConfirmed);
  }

}
