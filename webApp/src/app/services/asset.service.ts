import { Injectable } from '@angular/core';
import { HttpService } from './http/http.service';

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
      this.httpService.Post(this.baseUrl + '/upload', testData, { 'Content-Type': 'multipart/form-data; boundary=--------------------------931026015913916755533104'}).subscribe((response: any) => {
        resolve(response.result);
      }, (err) => {
        reject(err);
      });
    });

  }
}
