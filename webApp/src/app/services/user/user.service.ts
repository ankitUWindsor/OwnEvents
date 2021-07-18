import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from 'src/assets/models';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  private baseUrl = '/userInfo';

  isNavBarOpen: boolean;
  constructor(private httpService: HttpService, private router: Router) { }

  public GetUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Get(this.baseUrl).subscribe((response: any) => {
        this.user = response.result;
        resolve(response.result);
      }, (err) => {
        reject(err.message);
        this.router.navigate(['login']);
      });
    });
  }

  public UpdateUser(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Post(this.baseUrl + '/update', user).subscribe((response: any) => {
        this.user = response.result;
        resolve(response.result);
      }, (err) => {
        reject(err.message);
        this.router.navigate(['login']);
      });
    });
  }

}
