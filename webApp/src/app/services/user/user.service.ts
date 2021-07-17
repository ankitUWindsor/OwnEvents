import { Injectable } from '@angular/core';
import { User } from 'src/assets/models';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  private baseUrl = '/userInfo';
  constructor(private httpService: HttpService) { }

  public GetUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Get(this.baseUrl).subscribe((response: any) => {
        this.user = response.result;
        resolve(response.result);
      }, err => reject(err.message));
    });
  }

  public UpdateUser(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Post(this.baseUrl + '/update', user).subscribe((response: any) => {
        this.user = response.result;
        resolve(response.result);
      }, err => reject(err.message));
    });
  }

}
