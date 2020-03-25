import { Component, ViewChild, Input } from "@angular/core";
import { UploadService } from "../services/upload.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { JsonPipe } from "@angular/common";

@Component({
  selector: "app-parser-result",
  templateUrl: "./parser-result.component.html"
})
export class ParserResultComponent {
  constructor(private uploadService: UploadService) { }

  @ViewChild("file", { static: false }) file;
  @ViewChild("jsonOutput", { static: false }) jsonOutputElement;
  public files: File[] = [];

  uploadInProgress: boolean = false;
  parsedResponse: any;
  parsedData: string = '';
  jsonPipe: JsonPipe = new JsonPipe() ;
  onFilesAdded() {
    this.files = [];
    const files: { [key: string]: File } = this.file.nativeElement.files;
    this.parsedData = undefined;
    this.parsedResponse = undefined;

    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.push(files[key]);
      }
    }

    this.parsedResponse = undefined;
  }

  async startUpload() {
    this.uploadInProgress = true;
    this.parsedResponse = await this.uploadService.transformToJson(this.files[0]);
    this.parsedData = this.jsonPipe.transform(this.parsedResponse);
    this.uploadInProgress = false;

  }


  async publishEditedData() {
    if (confirm("Did you triple check your data? Are you sure you want tot publish this ?")) {
      this.uploadInProgress = true;
      const response = await this.uploadService.publishJson(this.parsedData);
      this.parsedData = this.jsonPipe.transform(response);
      this.uploadInProgress = false;

    }
  }


  handleUploadError(error: any) {
    this.uploadInProgress = false;

    console.log(error);
    alert(JSON.stringify(error));
  }


  copyResponseToClipboard() {
    this.jsonOutputElement.nativeElement.focus();
    this.jsonOutputElement.nativeElement.select();
    document.execCommand("copy");
  }
}
