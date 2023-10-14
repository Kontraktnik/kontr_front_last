import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {distinct, map, shareReplay} from "rxjs/operators";
import {IResponse} from "../shared/models/common/response";
import {Survey} from "../shared/models/survey/survey";
import {of} from "rxjs";
import {IPagination} from "../shared/helpers/pagination";
import {UserParameters} from "../shared/parameters/userParameters";
import {Vacancy} from "../shared/models/vacancy/vacancy";
import {AppConfigService} from "../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //@ts-ignore
  pagination: IPagination<Survey>;
  userParams: UserParameters = new UserParameters()
  surveys:Survey[] = [];

  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  sendRequest(values: any) {
    let params = new HttpParams();
    params = params.append('UserSign', 'asdasd');
    return this.http.post<IResponse<Survey>>(this.baseApiUrl + "/User/SendRequest", values, {observe: 'response', params}).pipe(
      map((response) => {
        return response.body
      }),
      distinct(),
      shareReplay()
    );
  }

  getMySurveys() {
    // if (this.surveys.length > 0) {
    //   const pagesReceived = Math.ceil(this.surveys.length / this.userParams.pageSize);
    //
    //   if (this.userParams.pageIndex <= pagesReceived) {
    //     this.pagination.data =
    //       this.surveys.slice((this.userParams.pageIndex - 1) * this.userParams.pageSize,
    //         this.userParams.pageIndex * this.userParams.pageSize);
    //
    //     return of(this.pagination);
    //   }
    // }

    let params = new HttpParams();
    params = params.append('pageIndex', this.userParams.pageIndex.toString());
    params = params.append('pageSize', this.userParams.pageSize.toString());

    return this.http.get<IPagination<Survey>>(this.baseApiUrl + '/User/MySurveys', { observe: 'response', params })
      .pipe(
        map(response => {
          // @ts-ignore
          this.surveys = [...this.surveys, ...response.body.data];
          // @ts-ignore
          this.pagination = response.body;
          return this.pagination;
        }),
        distinct(),
        shareReplay()
      );
  }

  getMySurveyById(id: number) {
    let data:Survey
    return this.http.get<IResponse<Survey[]>>(this.baseApiUrl + '/User/MySurveys')
      .pipe(
        map(response => {
          response.data.forEach(function (val) {
            if (val.id == id) {
              data = val
            }
          })
          return data
        }),
        distinct(),
        shareReplay()
      )
  }

  passMed(profId: number,status:number = 1) {
    let params = new HttpParams();
    params = params.append('profileId', profId);
    let values = {
      signKey: "sdfdadgagas",
      comment: "",
      status: status
    }
    return this.http.post<IResponse<Survey>>(this.baseApiUrl + "/User/SendMedDocuments?ProfileId="+profId, values).pipe(
      map(response => {
        return response
      })
    )
  }

  passPsychoTest(profId: number,status:number = 1) {
    let params = new HttpParams();
    params = params.append('profileId', profId);
    let values = {
      signKey: "sdfdadgagas",
      comment: "",
      status: status
    }
    return this.http.post<IResponse<Survey>>(this.baseApiUrl + "/User/PassPsycho?ProfileId=" + profId, values).pipe(
      map(response => {
        return response
      })
    )
  }

  signOffer(profId: number,status:number = 1) {
    let params = new HttpParams();
    params = params.append('profileId', profId);
    let values = {
      signKey: "sdfdadgagas",
      comment: "",
      status: status
    }
    return this.http.post<IResponse<Survey>>(this.baseApiUrl + "/User/SignOffer?ProfileId=" + profId, values).pipe(
      map(response => {
        return response
      })
    )
  }

  getUserParams() {
    return this.userParams;
  }

  setVacancyParams(params: UserParameters) {
    this.userParams = params;
  }
}
