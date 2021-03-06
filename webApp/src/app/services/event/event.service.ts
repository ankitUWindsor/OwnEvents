import { Injectable } from '@angular/core';
import { Event } from 'src/assets/models';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = '/event';
  constructor(private httpService: HttpService) { }

  CreateEvent(event: Event): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Post(this.baseUrl + '/create', event).subscribe(
        (response: any) => {
          resolve(response.result);
        }, err => reject(err));
    });
  }

  UpdateEvent(event: Event): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Post(this.baseUrl + '/update', event).subscribe(
        (response: any) => {
          resolve(response.result);
        }, err => reject(err));
    });
  }

  GetEvents(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Get(this.baseUrl + '/list').subscribe(
        (response: any) => {
          resolve(response.result);
        }, err => reject(err));
    });
  }

  GetEventById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Get(this.baseUrl + '/eventbyid?id=' + id).subscribe(
        (response: any) => {
          if (response.success === 200) {
            resolve(response.result);
          } else {
            reject(response.message);
          }
        }, err => reject(err));
    });
  }


  DeleteEvent(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Delete(this.baseUrl + '/delete?id=' + id).subscribe(
        (response) => {
          resolve(response);
        }, err => reject(err));
    });
  }

}
