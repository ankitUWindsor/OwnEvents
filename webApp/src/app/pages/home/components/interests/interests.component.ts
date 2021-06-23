import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<InterestsComponent>) { }

  ngOnInit(): void {
  }

  CloseDialog(): void {
    this.dialogRef.close();
  }

}
