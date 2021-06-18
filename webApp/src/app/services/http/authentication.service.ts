import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/assets/models';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = '/user';
  constructor(private httpService: HttpService, private router: Router) { }

  public AuthenticateUser(user: any) {
    return new Promise((resolve, reject) => {
      const header = {
        'user-token': window.btoa(user.email + ':@#' + user.password + user.userType.type),
      };
      this.httpService.Post(this.baseUrl + '/login', null, header).subscribe((response: any) => {
        localStorage.setItem(this.httpService.AUTHORIZATION_KEY, response.authToken);
        resolve(response);
      }, (err) => {
        reject(err);
      });
    });
  }

  public RegisterUser(user: User) {
    return new Promise((resolve, reject) => {
      user.password = window.btoa(user.password);
      this.httpService.Post(this.baseUrl + '/register', user).subscribe((response: any) => {
        localStorage.setItem(this.httpService.AUTHORIZATION_KEY, response.authToken);
        resolve(response);
      }, (err) => {
        reject(err);
      });
    });
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}


