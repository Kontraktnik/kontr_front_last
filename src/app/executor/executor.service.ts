import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {IPagination} from "../shared/helpers/pagination";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {Profile} from "../shared/models/profile/profile";
import {Observable} from "rxjs";
import {SendConfirmation} from "../shared/models/profile/sendConfirmation";
import {IResponse} from "../shared/models/common/response";
import {ToastrService} from "ngx-toastr";
import {SendRequest} from "../shared/models/profile/sendRequest";
import {ProfileExecutorParameters} from "./profileExecutorParameters";
import {AllRequestParameters} from "../director/director-requests/all-requests/allRequestParameters";
import {Survey} from "../shared/models/survey/survey";
import {AllExecutorRequestParameters} from "./executor-requests/all-requests/allExecutorRequestParameters";
import {AppConfigService} from "../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class ExecutorService {
  baseApiUrl: string = '';

  constructor(private http:HttpClient, private router: Router,private toastr: ToastrService, private appConfigService: AppConfigService) {
    this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getSended(parameter:ProfileExecutorParameters){
    let httpParams = new HttpParams();
    if(parameter.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameter.pageIndex);
    }
    if(parameter.pageSize > -1){
      httpParams = httpParams.append("PageSize",parameter.pageSize);
    }
    return this.http.get<IPagination<Profile>>(this.baseApiUrl + "/Executor/Sended",{observe:"response",params:httpParams}).pipe(
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

  getAccepted(parameter:ProfileExecutorParameters){
    let httpParams = new HttpParams();
    if(parameter.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameter.pageIndex);
    }
    if(parameter.pageSize > -1){
      httpParams = httpParams.append("PageSize",parameter.pageSize);
    }
    return this.http.get<IPagination<Profile>>(this.baseApiUrl + "/Executor/Accepted",{observe:"response",params:httpParams}).pipe(
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
  
  getSpecialCheck(parameter:ProfileExecutorParameters){
    let httpParams = new HttpParams();
    if(parameter.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameter.pageIndex);
    }
    if(parameter.pageSize > -1){
      httpParams = httpParams.append("PageSize",parameter.pageSize);
    }
    if(parameter.requestedStatus != null && parameter.requestedStatus.length > 0){
      for(let item of parameter.requestedStatus){
        httpParams = httpParams.append("RequestedStatus",item);
      }
    }
    return this.http.get<IPagination<Profile>>(this.baseApiUrl + "/Executor/SpecialCheck",{observe:"response",params:httpParams}).pipe(
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

  getMedState(parameter:ProfileExecutorParameters){
    let httpParams = new HttpParams();
    if(parameter.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameter.pageIndex);
    }
    if(parameter.pageSize > -1){
      httpParams = httpParams.append("PageSize",parameter.pageSize);
    }
    if(parameter.requestedStatus != null && parameter.requestedStatus.length > 0){
      for(let item of parameter.requestedStatus){
        httpParams = httpParams.append("RequestedStatus",item);
      }
    }
    return this.http.get<IPagination<Profile>>(this.baseApiUrl + "/Executor/MedState",{observe:"response",params:httpParams}).pipe(
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

  getPsychoState(parameter:ProfileExecutorParameters){
    let httpParams = new HttpParams();
    if(parameter.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameter.pageIndex);
    }
    if(parameter.pageSize > -1){
      httpParams = httpParams.append("PageSize",parameter.pageSize);
    }
    if(parameter.requestedStatus != null && parameter.requestedStatus.length > 0){
      for(let item of parameter.requestedStatus){
        httpParams = httpParams.append("RequestedStatus",item);
      }
    }
    return this.http.get<IPagination<Profile>>(this.baseApiUrl + "/Executor/PsychoState",{observe:"response",params:httpParams}).pipe(
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

  getSendOffer(parameter:ProfileExecutorParameters){
    let httpParams = new HttpParams();
    if(parameter.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameter.pageIndex);
    }
    if(parameter.pageSize > -1){
      httpParams = httpParams.append("PageSize",parameter.pageSize);
    }
    if(parameter.requestedStatus != null && parameter.requestedStatus.length > 0){
      for(let item of parameter.requestedStatus){
        httpParams = httpParams.append("RequestedStatus",item);
      }
    }
    return this.http.get<IPagination<Profile>>(this.baseApiUrl + "/Executor/SendOffer",{observe:"response",params:httpParams}).pipe(
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

  getSigning(parameter:ProfileExecutorParameters){
     let httpParams = new HttpParams();
     if(parameter.pageIndex > 0){
       httpParams = httpParams.append("PageIndex",parameter.pageIndex);
     }
     if(parameter.pageSize > -1){
       httpParams = httpParams.append("PageSize",parameter.pageSize);
     }
     if(parameter.requestedStatus != null && parameter.requestedStatus.length > 0){
       for(let item of parameter.requestedStatus){
         httpParams = httpParams.append("RequestedStatus",item);
       }
     }
    return this.http.get<IPagination<Profile>>(this.baseApiUrl + "/Executor/Signing",{observe:"response",params:httpParams}).pipe(
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

  getRejected(parameter:ProfileExecutorParameters){
    let httpParams = new HttpParams();
    if(parameter.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameter.pageIndex);
    }
    if(parameter.pageSize > -1){
      httpParams = httpParams.append("PageSize",parameter.pageSize);
    }
    return this.http.get<IPagination<Profile>>(this.baseApiUrl + "/Executor/Rejected",{observe:"response",params:httpParams}).pipe(
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

  //Post
  postAcceptDocument(profile:number,model:SendConfirmation){

    return this.http.post<IResponse<Profile>>(this.baseApiUrl + "/Executor/AcceptDocuments?ProfileId="+profile,model).pipe(
      map((response:IResponse<Profile>) => {
        if(response.message){
          this.toastr.success(response.message);
        }
        }, catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay()
    )
  }

  postRequestDocument(model:SendRequest){
    var url = "";
    switch (model.stepId){
      case 3:
        url = "SendToKnb";
        break;
      case 4:
        url = "SendToMed";
        break;
      case 6:
        url = "SendUserToPsycho";
        break;
      case 8:
        url = "OfferToUser";
        break;
      case 9:
        url = "SendOfferToSign";
        break;
    }

    return this.http.post<IResponse<Profile>>(this.baseApiUrl + "/Executor/"+url,model).pipe(
      map((response:IResponse<Profile>) => {
        if(response.message){
          this.toastr.success(response.message);
        }
        }, catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay()
    )
  }

  mySurveys(parameter:AllExecutorRequestParameters){
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
    return this.http.get<IPagination<Survey>>(this.baseApiUrl + "/Executor/MySurveys",{observe:"response",params:httpParams}).pipe(
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
