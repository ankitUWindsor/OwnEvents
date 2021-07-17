import { EventEditorComponent } from './components/event-editor/event-editor.component';
import { Router } from '@angular/router';
import { User } from 'src/assets/models';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InterestsComponent } from './components/interests/interests.component';
import { UserType } from 'src/assets/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isloading = false;

  constructor(private matDialog: MatDialog, private userService: UserService, private router: Router) { }

  get isOrganizer(): boolean {
    return this.userService.user.userType === UserType.Organizer;
  }

  ngOnInit(): void {
    // this.CreateNewEvent();


    this.isloading = true;
    this.userService.GetUser().then((response: User) => {
      if (response.userType === UserType.Audience) {
        this.OpenInterestsComponent();
      }

      this.OpenInterestsComponent();
      this.isloading = false;
    }, (err) => {
      this.isloading = false;
    });
  }

  OpenInterestsComponent(): void {
    let height = '80vh';
    let width = '80vw';
    if (screen.width <= 730) {
      height = '100vh';
      width = '100vw';
    }
    this.matDialog.open(InterestsComponent, {
      height: '100vh',
      width: '100vw',
    });
  }

  Logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  CheckActiveLink(route: string): boolean {
    return route === this.router.url.split('/')[this.router.url.split('/').length - 1];
  }

  CreateNewEvent(): void {
    this.matDialog.open(EventEditorComponent, {
      height: '100vh',
      width: '100vw'
    });
  }

}
