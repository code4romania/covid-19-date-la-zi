import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
  HttpEvent
} from '@angular/common/http';
import {  Observable } from 'rxjs';


@Injectable()
export class UploadService {
  constructor(private http: HttpClient) { }

  public upload(file: File, v2Upload?: boolean): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    let url = '/upload';

    if (v2Upload) {
      url = "v2/upload";
    }

    const uploadReq: HttpRequest<FormData> = new HttpRequest('POST', url, formData, {
        reportProgress: true
    });

    return this.http.request<any>(uploadReq);
}
}
