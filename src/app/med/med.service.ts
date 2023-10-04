import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {IPagination} from "../shared/helpers/pagination";
import {Profile} from "../shared/models/profile/profile";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {SendConfirmation} from "../shared/models/profile/sendConfirmation";
import {IResponse} from "../shared/models/common/response";
import {ProfileMedParameters} from "./profileMedParameters";
import {AppConfigService} from "../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class MedService {
  baseApiUrl : string = '';

  constructor(private http:HttpClient, private router: Router, private toastr: ToastrService, private appConfigService: AppConfigService) {
    this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getSended(parameter:ProfileMedParameters){
    let httpParams = new HttpParams();
    if(parameter.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameter.pageIndex);
    }
    if(parameter.pageSize > -1){
      httpParams = httpParams.append("PageSize",parameter.pageSize);
    }
    return this.http.get<IPagination<Profile>>(this.baseApiUrl + "/Med/Sended",{observe:"response",params:httpParams}).pipe(
      map((response) => {
          return response.body
        }, catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay()
    )
  }

  getPsycho(parameter:ProfileMedParameters){
    let httpParams = new HttpParams();
    if(parameter.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameter.pageIndex);
    }
    if(parameter.pageSize > -1){
      httpParams = httpParams.append("PageSize",parameter.pageSize);
    }
    return this.http.get<IPagination<Profile>>(this.baseApiUrl + "/Med/SendedPsycho",{observe:"response",params:httpParams}).pipe(
      map((response) => {
          return response.body
        }, catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay()
    )
  }

  getAccepted(parameter:ProfileMedParameters){
    let httpParams = new HttpParams();
    if(parameter.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameter.pageIndex);
    }
    if(parameter.pageSize > -1){
      httpParams = httpParams.append("PageSize",parameter.pageSize);
    }
    return this.http.get<IPagination<Profile>>(this.baseApiUrl + "/Med/Accepted",{observe:"response",params:httpParams}).pipe(
      map((response) => {
          return response.body
        }, catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay()
    )
  }


  getRejected(parameter:ProfileMedParameters){
    let httpParams = new HttpParams();
    if(parameter.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameter.pageIndex);
    }
    if(parameter.pageSize > -1){
      httpParams = httpParams.append("PageSize",parameter.pageSize);
    }
    return this.http.get<IPagination<Profile>>(this.baseApiUrl + "/Med/Rejected",{observe:"response",params:httpParams}).pipe(
      map((response) => {
          return response.body
        }, catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay()
    )
  }


    postMedCheckProfile(profile:number,model:SendConfirmation){
    return this.http.post<IResponse<Profile>>(this.baseApiUrl + "/Med/MedCheckProfile?ProfileId="+profile,model).pipe(
      map((response:IResponse<Profile>) => {
          this.toastr.success(response.message);
        }, catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay()
    )
  }


  postCheckUserPsycho(profile:number,model:SendConfirmation){
    return this.http.post<IResponse<Profile>>(this.baseApiUrl + "/Med/CheckUserPsycho?ProfileId="+profile,model).pipe(
      map((response:IResponse<Profile>) => {
          this.toastr.success(response.message);
        }, catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay()
    )
  }

}
