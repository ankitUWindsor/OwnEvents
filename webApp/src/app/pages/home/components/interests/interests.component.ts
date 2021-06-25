import { UserService } from './../../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EventTypes } from 'src/assets/constants';
import { InterestsCategory } from 'src/assets/enums';
@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {
  selectedTypes: Array<{ text: string, enumValue: string }> = [];
  unselectedTypes = [];
  selectedEventsFromService = [1, 2, 5, 6, 7];
  constructor(private dialogRef: MatDialogRef<InterestsComponent>, private userService: UserService) { }

  ngOnInit(): void {
    this.dialogRef.beforeClosed().subscribe(() => {
      this.userService.user.interests = [];
      const arr = [];
      this.selectedTypes.forEach((item: any) => {
        arr.push(InterestsCategory[item.enumValue]);
      });
      this.userService.user.interests = arr;
      this.userService.UpdateUser(this.userService.user).then((response) => {
      }, (err) => {
        console.error(err);
      });
    });

    EventTypes.forEach(element => {
      if (this.userService.user.interests.includes(InterestsCategory[element.enumValue])) {
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

  getScreenWidth(): number {
    return screen.width;
  }

}
