import { InterestsCategory } from 'src/assets/enums';
import { UserService } from './../../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { EventTypes } from 'src/assets/constants';
import { MatDialog } from '@angular/material';
import { InterestsComponent } from '../interests/interests.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public userService: UserService, private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  GetInterestsList(): string {
    let str = '';
    this.userService.user.interests.forEach((value, index) => {
      const foundAt = EventTypes.findIndex(item => item.enumValue === InterestsCategory[value]);
      str += EventTypes[foundAt].text;
      if (index !== this.userService.user.interests.length - 1) {
        str += ', ';
      }
    });
    if (str.length > 20) {
      str = str.slice(0, 17) + '...';
    }
    return str;
  }

  OpenInterests(): void {
    this.matDialog.open(InterestsComponent, {
      height: '100vh',
      width: '100vw',
    });
  }

}
