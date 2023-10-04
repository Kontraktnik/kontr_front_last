import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import {JobYear} from "../models/calculation/jobYear/jobYear";
import {JobYearParameters} from "../parameters/jobYearParameters";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class JobYearService {

  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(Id:number):Observable<IResponse<JobYear>>{
    return this.http.get<IResponse<JobYear>>(this.baseApiUrl + "/JobYear/GetById?Id="+Id.toString()).pipe(
      map((response:IResponse<JobYear>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll():Observable<IResponse<JobYear[]>>{
    return this.http.get<IResponse<JobYear[]>>(this.baseApiUrl + "/JobYear/GetAll").pipe(
      map((response:IResponse<JobYear[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };
  getAllWithParam(parameters:JobYearParameters){
    let httpParams = new HttpParams();

    if(parameters.pageIndex != null && parameters.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameters.pageIndex);
    }
    if(parameters.pageSize != null && parameters.pageSize > 0){
      httpParams = httpParams.append("PageSize",parameters.pageSize);
    }
    if(parameters.serviceYearId != null && parameters.serviceYearId > 0){
      httpParams = httpParams.append("ServiceYearId",parameters.serviceYearId);
    }
    if(parameters.jobCategoryId != null && parameters.jobCategoryId > 0){
      httpParams = httpParams.append("JobCategoryId",parameters.jobCategoryId);
    }
    return this.http.get<IPagination<JobYear>>(this.baseApiUrl + "/JobYear/All",{observe:"response",params:httpParams}).pipe(
      map((response)=>{
          return response.body;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:JobYear):Observable<IResponse<JobYear>>{
    return this.http.post<IResponse<JobYear>>(this.baseApiUrl + "/JobYear/Create",model).pipe(
      map((response:IResponse<JobYear>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:JobYear):Observable<IResponse<JobYear>>{
    return this.http.put<IResponse<JobYear>>(this.baseApiUrl + "/JobYear/Update?Id="+id,model).pipe(
      map((response:IResponse<JobYear>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Delete(id:number):Observable<IResponse<JobYear>>{
    return this.http.delete<IResponse<JobYear>>(this.baseApiUrl + "/JobYear/Delete?Id="+id).pipe(
      map((response:IResponse<JobYear>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };
}
