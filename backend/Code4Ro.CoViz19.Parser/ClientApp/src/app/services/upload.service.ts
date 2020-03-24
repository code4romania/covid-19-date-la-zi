import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class UploadService {
  publishJson(parsedData: string): Promise<any> {

    const url = 'v3/upload-json';

    return this.http.post(url, parsedData, { headers: new HttpHeaders().set('Content-Type', 'application/json') }).toPromise();
  }


  transformToJson(file: File): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const url = 'v3/pdf-to-json';


    return this.http.post(url, formData).toPromise();
  }

  constructor(private http: HttpClient) { }

  public upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const url = 'v3/upload';


    const uploadReq: HttpRequest<FormData> = new HttpRequest('POST', url, formData, {
      reportProgress: true
    });

    return this.http.request<any>(uploadReq);
  }
}
