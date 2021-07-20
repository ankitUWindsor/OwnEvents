import { BookingsComponent } from './components/bookings/bookings.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [{
  path: '', component: HomeComponent,
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'updates' },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'updates', component: MainComponent, canActivate: [AuthGuard] },
    { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard] }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
