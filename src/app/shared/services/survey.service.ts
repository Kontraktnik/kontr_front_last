import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {Survey} from "../models/survey/survey";
import {catchError, debounceTime, distinct, map, shareReplay} from "rxjs/operators";
import {Profile} from "../models/profile/profile";
import {SurveyMed} from "../models/survey/surveyMed";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(id:number):Observable<IResponse<Survey>>{
    return this.http.get<IResponse<Survey>>(this.baseApiUrl + "/Survey/GetById?Id="+id.toString()).pipe(
      map((response:IResponse<Survey>)=>{
        return response;
      },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  }

  SendSavedRequest(SurveyId:number,signUser:string){
    return this.http.post<IResponse<Profile>>(this.baseApiUrl + "/User/SendSavedRequest?UserSign="+signUser,SurveyId).pipe(
      map((response:IResponse<Profile>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
    )
  }

  Update(SurveyId:number,model:SurveyMed){
    return this.http.put<IResponse<boolean>>(this.baseApiUrl + "/Survey/Update?SurveyId="+SurveyId,model).pipe(
      map((response:IResponse<boolean>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
    )
  }

  deleteById(Id:number){
    return this.http.delete<IResponse<boolean>>(this.baseApiUrl + "/Survey/Delete?Id="+Id.toString()).pipe(
      map((response:IResponse<boolean>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
    )
  }

  getReport(SurveyId:number){
    return this.http.post<IResponse<string>>(this.baseApiUrl + "/Survey/GetSurveyInfo?Id="+SurveyId,{}).pipe(
      map((response:IResponse<string>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
    )
  }



}
