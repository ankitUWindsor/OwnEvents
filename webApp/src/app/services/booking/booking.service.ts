import { Booking } from './../../../assets/models';
import { UserService } from './../user/user.service';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = '/booking';

  constructor(private httpService: HttpService, private userService: UserService) { }

  CreateBooking(booking: Booking): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Post(this.baseUrl + '/create', booking).subscribe((response: any) => {
        if (response.success === 200) {
          resolve(response.result);
        } else {
          reject(response.message);
        }
      }, err => reject(err.message));
    });
  }

  UpdateBooking(booking: Booking): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Post(this.baseUrl + '/update', booking).subscribe((response: any) => {
        if (response.success === 200) {
          resolve(response.result);
        } else {
          reject(response.message);
        }
      }, err => reject(err.message));
    });
  }

  GetAllBookings(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Get(this.baseUrl + '/list').subscribe((response: any) => {
        resolve(response.result);
      }, err => reject(err.message));
    });
  }

  CancelBooking(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Delete(this.baseUrl + '/cancel?id=' + id).subscribe((response: any) => {
        resolve(response.result);
      }, err => reject(err.message));
    });
  }

}
