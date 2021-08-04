import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/assets/models';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = '/user';
  constructor(private httpService: HttpService, private router: Router) { }

  public AuthenticateUser(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      const header = {
        'user-token': window.btoa(user.email + ':@#' + user.password),
      };
      this.httpService.Post(this.baseUrl + '/login', { userType: user.userType }, header).subscribe((response: any) => {
        localStorage.setItem(this.httpService.AUTHORIZATION_KEY, response.authToken);
        resolve(response);
      }, (err) => {
        reject(err);
      });
    });
  }

  public RegisterUser(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      user.password = window.btoa(user.password);
      this.httpService.Post(this.baseUrl + '/register', user).subscribe((response: any) => {
        // localStorage.setItem(this.httpService.AUTHORIZATION_KEY, response.authToken);
        resolve(response);
      }, (err) => {
        reject(err);
      });
    });
  }

  public ForgotPassword(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Post(this.baseUrl + '/forgot-password', { email }).subscribe((response) => {
        resolve(response);
      }, (err) => {
        reject(err);
      });
    });
  }

  public ResetPassword(token: string, password: string): Promise<any> {
    password = window.btoa(password);
    return new Promise((resolve, reject) => {
      this.httpService.Post(this.baseUrl + '/reset-password', { token, password }).subscribe((response) => {
        resolve(response);
      }, (err) => {
        reject(err);
      });
    });
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}


