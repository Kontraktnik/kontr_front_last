import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {IPagination} from "../shared/helpers/pagination";
import {Profile} from "../shared/models/profile/profile";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IResponse} from "../shared/models/common/response";
import {IUser} from "../shared/models/user/user";
import {SurveyExecutorCreate} from "../shared/models/survey/surveyExecutorCreate";
import {SendConfirmation} from "../shared/models/profile/sendConfirmation";
import {DirectorReceivedParameters} from "./director-requests/received-requests/directorReceivedParameters";
import {DirectorRejectedParameters} from "./director-requests/rejected-requests/directorRejectedParameters";
import {DirectorAgreedParameters} from "./director-requests/agreed-requests/directorAgreedParameters";
import {StatisticParameters} from "./director-requests/statistics/statisticParameters";
import {SurveyStats} from "../shared/models/survey/SurveyStats";
import {AllRequestParameters} from "./director-requests/all-requests/allRequestParameters";
import {Survey} from "../shared/models/survey/survey";
import {AppConfigService} from "../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  baseApiUrl: string = '';
  
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private appConfigService: AppConfigService) {
    this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getSended(parameter:DirectorReceivedParameters){
    let httpParams = new HttpParams();
    if(parameter.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameter.pageIndex);
    }
    if(parameter.pageSize > -1){
      httpParams = httpParams.append("PageSize",parameter.pageSize);
    }
    return this.http.get<IPagination<Profile>>(this.baseApiUrl + "/Director/Sended",{observe:"response",params:httpParams}).pipe(
      map((response:HttpResponse<IPagination<Profile>>) => {
          return response.body
        }, catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay()
    )
  }


  getOffered(parameter:DirectorAgreedParameters){
    let httpParams = new HttpParams();
    if(parameter.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameter.pageIndex);
    }
    if(parameter.pageSize > -1){
      httpParams = httpParams.append("PageSize",parameter.pageSize);
    }
    return this.http.get<IPagination<Profile>>(this.baseApiUrl + "/Director/Offered",{observe:"response",params:httpParams}).pipe(
      map((response:HttpResponse<IPagination<Profile>>) => {
          return response.body
        }, catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay()
    )
  }

  getSigned(parameter:DirectorReceivedParameters){
    let httpParams = new HttpParams();
    if(parameter.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameter.pageIndex);
    }
    if(parameter.pageSize > -1){
      httpParams = httpParams.append("PageSize",parameter.pageSize);
    }
    return this.http.get<IPagination<Profile>>(this.baseApiUrl + "/Director/Signed",{observe:"response",params:httpParams}).pipe(
      map((response:HttpResponse<IPagination<Profile>>) => {
          return response.body
        }, catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay()
    )
  }

  getRejected(parameter:DirectorRejectedParameters){
    let httpParams = new HttpParams();
    if(parameter.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameter.pageIndex);
    }
    if(parameter.pageSize > -1){
      httpParams = httpParams.append("PageSize",parameter.pageSize);
    }
    return this.http.get<IPagination<Profile>>(this.baseApiUrl + "/Director/Rejected",{observe:"response",params:httpParams}).pipe(
      map((response:HttpResponse<IPagination<Profile>>) => {
          return response.body
        }, catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay()
    )
  }


  getExecutors() : Observable<IUser[]>{
    return this.http.get<IResponse<IUser[]>>(this.baseApiUrl + "/Director/GetExecutors").pipe(
      map((response:IResponse<IUser[]>) => {
          return response.data
        }, catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay()
    )
  }

  postConfirmSendedDocument(profileId:number, signKey:string,model:SurveyExecutorCreate) : Observable<IResponse<Profile>>{
  return this.http.post<IResponse<Profile>>(this.baseApiUrl + "/Director/ConfirmSendedDocument?ProfileId="+profileId.toString() +"&SignKey="+signKey.toString(),model).pipe(
    map((response:IResponse<Profile>) => {
          return response
          }, catchError(error => {
            return error
          })
          ),
    distinct(),
      shareReplay()
  )
}
  postSignUser(profileId:number,model:SendConfirmation) : Observable<IResponse<Profile>>{
    return this.http.post<IResponse<Profile>>(this.baseApiUrl + "/Director/SignUser?ProfileId="+profileId.toString(),model).pipe(
      map((response:IResponse<Profile>) => {
          return response
        }, catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay()
    )
  }

  getStats(parameter:StatisticParameters){
    let httpParams = new HttpParams();
    if(parameter.dateFrom != null){
      httpParams = httpParams.append("DateFrom",parameter.dateFrom.toString());
    }
    if(parameter.dateTo != null){
      httpParams = httpParams.append("DateTo",parameter.dateTo.toString());
    }
    if(parameter.executorId != null && parameter.executorId > 0){
      httpParams = httpParams.append("ExecutorId",parameter.executorId.toString());
    }
    if(parameter.educationId != null && parameter.educationId > 0){
      httpParams = httpParams.append("EducationId",parameter.educationId.toString());
    }
    if(parameter.armyRankId != null && parameter.armyRankId > 0){
      httpParams = httpParams.append("ArmyRankId",parameter.armyRankId.toString());
    }
    if(parameter.vTShId != null && parameter.vTShId > 0){
      httpParams = httpParams.append("VTShId",parameter.vTShId.toString());
    }
    if(parameter.positionId != null && parameter.positionId > 0){
      httpParams = httpParams.append("PositionId",parameter.positionId.toString());
    }

    return this.http.get<IResponse<SurveyStats>>(this.baseApiUrl + "/Director/GetStats",{observe:"response",params:httpParams}).pipe(
      map((response:HttpResponse<IResponse<SurveyStats>>) => {
          return response.body
        }, catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay()
    )
  }


  mySurveys(parameter:AllRequestParameters){
    let httpParams = new HttpParams();
    if(parameter.pageIndex != null && parameter.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameter.pageIndex)
    }
    if(parameter.pageSize != null && parameter.pageSize > 0){
      httpParams = httpParams.append("PageSize",parameter.pageSize)
    }
    if(parameter.dateFrom != null){
      httpParams = httpParams.append("DateFrom",parameter.dateFrom.toString());
    }
    if(parameter.dateTo != null){
      httpParams = httpParams.append("DateTo",parameter.dateTo.toString());
    }
    if(parameter.educationId != null && parameter.educationId > 0){
      httpParams = httpParams.append("EducationId",parameter.educationId.toString());
    }
    if(parameter.armyRankId != null && parameter.armyRankId > 0){
      httpParams = httpParams.append("ArmyRankId",parameter.armyRankId.toString());
    }
    if(parameter.vTShId != null && parameter.vTShId > 0){
      httpParams = httpParams.append("VTShId",parameter.vTShId.toString());
    }
    if(parameter.positionId != null && parameter.positionId > 0){
      httpParams = httpParams.append("PositionId",parameter.positionId.toString());
    }
    if(parameter.status != null){
      httpParams = httpParams.append("Status",parameter.status.toString());
    }
    if(parameter.stepId != null && parameter.stepId > 0){
      httpParams = httpParams.append("StepId",parameter.stepId.toString());
    }
    if(parameter.search != null){
      httpParams = httpParams.append("Search",parameter.search.toString());
    }
    return this.http.get<IPagination<Survey>>(this.baseApiUrl + "/Director/MySurveys",{observe:"response",params:httpParams}).pipe(
      map((response:HttpResponse<IPagination<Survey>>) => {
          return response.body
        }, catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay()
    )
  }

}
