import { Pipe, PipeTransform } from '@angular/core';
import {AppConfigService} from "../../shared/services/app.config.service";

@Pipe({
  name: 'authFile'
})
export class AuthFilePipe implements PipeTransform {
  baseUrl: string = '';

  constructor(private appConfigService: AppConfigService) {
		this.baseUrl = this.appConfigService.baseUrl;
  }

  transform(url: string | null | undefined, defaultValue: boolean = false ) {
    let token = localStorage.getItem("token");
    if (url && url.length > 0) {
      return  this.baseUrl + "/" + url + "?token=" + token;
    }
    if (defaultValue) {
      return "assets/images/no-file.png";
    }

    return  null;
  }

}
