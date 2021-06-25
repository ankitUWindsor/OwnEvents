import { InterestsCategory } from './../../../../../assets/enums';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EventTypes } from 'src/assets/constants';
@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {
  selectedTypes = [];
  unselectedTypes = [];
  selectedEventsFromService = [1, 2, 5, 6, 7];
  constructor(private dialogRef: MatDialogRef<InterestsComponent>) { }

  ngOnInit(): void {
    EventTypes.forEach(element => {
      if (this.selectedEventsFromService.includes(InterestsCategory[element.enumValue])) {
        this.selectedTypes.push(element);
      } else {
        this.unselectedTypes.push(element);
      }
    });
  }

  AddInterest(index: number): void {
    this.selectedTypes.push(this.unselectedTypes[index]);
    this.unselectedTypes.splice(index, 1);
  }

  RemoveInterest(index: number): void {
    this.unselectedTypes.push(this.selectedTypes[index]);
    this.selectedTypes.splice(index, 1);
  }

  CloseDialog(): void {
    this.dialogRef.close();
  }

}
