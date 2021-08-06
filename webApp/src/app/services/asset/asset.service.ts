import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  baseUrl = '/images';
  constructor(private httpService: HttpService) { }

  UploadImage(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const testData: FormData = new FormData();
      testData.append('image', file, file.name);
      this.httpService.Post(this.baseUrl + '/upload', testData, { 'Content-Type': ' ' }).subscribe((response: any) => {
        resolve(response.result);
      }, (err) => {
        reject(err);
      });
    });
  }

  GetImageUrl(name: string): string {
    return environment.publicStorage + name;
  }

  CheckForDateAllowed(date: Date) {
    const toCheckDate = moment(new Date(date));
    const currentDate = moment(new Date());
    const hourDiff = toCheckDate.diff(currentDate, 'hours');
    return hourDiff >= 1;
  }

}
