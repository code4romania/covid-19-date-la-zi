import { Component, ViewChild, Input } from "@angular/core";
import { UploadService } from "../services/upload.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-parser-result",
  templateUrl: "./parser-result.component.html"
})
export class ParserResultComponent {
  constructor(private uploadService: UploadService) {}

  @ViewChild("file", { static: false }) file;
  @ViewChild("jsonOutput", { static: false }) jsonOutputElement;
  public files: File[] = [];

  uploadInProgress: boolean = false;
  parsedResponse: any;
  onFilesAdded() {
    this.files = [];
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.push(files[key]);
      }
    }

    this.parsedResponse = undefined;
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
    console.log(error);
    alert(JSON.stringify(error));
  }
  handleUploadResponse(body: any) {
    this.parsedResponse = body;
  }

  copyResponseToClipboard() {
    this.jsonOutputElement.nativeElement.focus();
    this.jsonOutputElement.nativeElement.select();
    document.execCommand("copy");
  }
}
