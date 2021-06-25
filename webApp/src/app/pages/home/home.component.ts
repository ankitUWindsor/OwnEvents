import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InterestsComponent } from './components/interests/interests.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.OpenInterestsComponent();
  }

  OpenInterestsComponent(): void {
    let height = '80vh';
    let width = '80vw';
    if (screen.width <= 730) {
      height = '100vh';
      width = '100vw';
    }
    this.matDialog.open(InterestsComponent, {
      height,
      width,
    });
  }

}
