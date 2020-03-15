import { NgModule } from "@angular/core";
import { ServerModule } from "@angular/platform-server";
import { ModuleMapLoaderModule } from "@nguniversal/module-map-ngfactory-loader";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";
import { UploadService } from "./services/upload.service";

@NgModule({
  imports: [AppModule, ServerModule, ModuleMapLoaderModule],
  bootstrap: [AppComponent],
  providers: [UploadService]
})
export class AppServerModule {}
