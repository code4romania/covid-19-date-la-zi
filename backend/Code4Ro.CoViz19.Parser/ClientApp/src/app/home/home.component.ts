import { Component, ViewChild } from "@angular/core";
import { UploadService } from "../services/upload.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent {
  constructor(private uploadService: UploadService) {}

  @ViewChild("file", { static: false }) file;
  public files: File[] = [];

  uploadInProgress: boolean = false;
  parsedResponse: any;
  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.push(files[key]);
      }
    }
  }

  async startUpload() {
    this.uploadService.upload(this.files[0]).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
        } else if (event instanceof HttpResponse) {
          this.handleUploadResponse(event.body);
        }
      },
      e => this.handleUploadError(e)
    );
  }
  handleUploadError(error: any) {
    alert(JSON.stringify(error));
  }
  handleUploadResponse(body: any) {
    this.parsedResponse = body;
  }
}
