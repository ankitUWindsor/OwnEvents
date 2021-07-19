import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  AUTHORIZATION_KEY = 'auth-token';
  constructor(private httpClient: HttpClient) { }

  Get(url: string) {
    return this.httpClient.get(environment.api + url, { headers: this.GetHttpHeaders() });
  }

  Post(url: string, body: any, header = {}) {
    return this.httpClient.post(environment.api + url, body, { headers: this.GetHttpHeaders(header) });
  }

  Put(url: string, body: any, header = {}) {
    return this.httpClient.put(environment.api + url, body, { headers: this.GetHttpHeaders(header) });
  }


  Delete(url: string, header = {}) {
    return this.httpClient.delete(environment.api + url, { headers: this.GetHttpHeaders(header) });
  }

  private GetHttpHeaders(header = {}): HttpHeaders {
    if (!header['Content-Type']) {
      header['Content-Type'] = 'application/json';
    }
    header['Access-Control-Allow-Origin'] = '*';
    if (localStorage.getItem(this.AUTHORIZATION_KEY)) {
      header['auth-token'] = localStorage.getItem(this.AUTHORIZATION_KEY);
    }
    if (!header['Content-Type'].trim().length) {
      delete header['Content-Type'];
    }
    const headers = new HttpHeaders({ ...header });

    return headers;
  }
}
