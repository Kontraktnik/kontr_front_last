import { Injectable } from '@angular/core';
import {debounceTime, distinct, distinctUntilChanged, map, shareReplay} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  saveFile(file: any) {
    return this.http.post(this.baseApiUrl + '/file/uploadfile', file, {responseType: "text"}).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(response => {
        return response
      }),
      distinct(),
      shareReplay()
    )
  }


}
