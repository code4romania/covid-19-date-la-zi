import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ParserResultComponent } from "./parser-result/parser-result.component";
import { UploadService } from "./services/upload.service";

@NgModule({
  declarations: [AppComponent, HomeComponent, ParserResultComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" }
    ])
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule {}
