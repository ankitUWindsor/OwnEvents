import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { InterestsComponent } from './components/interests/interests.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    HomeComponent, InterestsComponent, ProfileComponent, MainComponent
  ],
  imports: [
    HomeRoutingModule,
    MatDialogModule,
    FormsModule,
    CommonModule
  ],
  entryComponents: [InterestsComponent]
})
export class HomeModule { }
