import { ConfirmationBoxComponent } from './components/confirmation-box/confirmation-box.component';
import { EmitterTask } from './../../../assets/enums';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { EventEditorComponent } from './components/event-editor/event-editor.component';
import { Router } from '@angular/router';
import { User } from 'src/assets/models';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InterestsComponent } from './components/interests/interests.component';
import { UserType } from 'src/assets/enums';
import { GlobalEmitterService } from 'src/app/services/global-emitter/global-emitter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isloading = false;
  sideNavCheckBox: boolean;
  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private globalEmitterService: GlobalEmitterService,
    private authenticationService: AuthenticationService) { }

  get isOrganizer(): boolean {
    return this.userService.user.userType === UserType.Organizer;
  }

  get userType(): UserType {
    return this.userService.user.userType;
  }
  UserType = UserType;
  ngOnInit(): void {
    this.isloading = true;
    this.userService.GetUser().then((response: User) => {
      this.isloading = false;
      if (response.userType === UserType.Audience) {
        this.OpenInterestsComponent();
      }

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
    this.authenticationService.logout();
  }

  CheckActiveLink(route: string): boolean {
    return route === this.router.url.split('/')[this.router.url.split('/').length - 1];
  }

  CreateNewEvent(): void {
    const dialogRef = this.matDialog.open(EventEditorComponent, {
      height: '100vh',
      width: '100vw'
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.globalEmitterService.Emit(EmitterTask.EventCreated);
      }
    });
  }

  SideNavChange(event: boolean): void {
    let time = 0;
    if (!event) {
      time = 350;
    }
    setTimeout(() => {
      this.userService.isNavBarOpen = event;
    }, time);
  }

  CloseNavBar(): void {
    this.sideNavCheckBox = false;
    this.SideNavChange(this.sideNavCheckBox);
  }

  OpenConfirmationBox() {
    let height = '25vh';
    let width = '60vw';
    if(screen.width<=800){
      height = '25vh';
      width = '90vw';
    }
    this.matDialog.open(ConfirmationBoxComponent,{
      height,
      width
    })
  }
}
