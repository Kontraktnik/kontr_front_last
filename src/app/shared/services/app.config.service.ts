import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  get cryptoSocketApiKey() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.cryptoSocketApiKey;
  }
  
  get baseApiUrl() {
    if (!this.appConfig) {
      return environment.baseApiUrl;
    }

    return environment.production ? this.appConfig.baseApiUrl : this.appConfig.devBaseApiUrl;
  }

  get baseUrl() {
    if (!this.appConfig) {
      return environment.baseUrl;
    }

    return environment.production ? this.appConfig.baseUrl : this.appConfig.devBaseUrl;
  }
}