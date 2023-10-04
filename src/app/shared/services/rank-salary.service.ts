import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import {RankSalary} from "../models/calculation/rankSalary/rankSalary";
import {RankSalaryParameters} from "../parameters/rankSalaryParameters";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class RankSalaryService {

  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(Id:number):Observable<IResponse<RankSalary>>{
    return this.http.get<IResponse<RankSalary>>(this.baseApiUrl + "/RankSalary/GetById?Id="+Id.toString()).pipe(
      map((response:IResponse<RankSalary>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll():Observable<IResponse<RankSalary[]>>{
    return this.http.get<IResponse<RankSalary[]>>(this.baseApiUrl + "/RankSalary/GetAll").pipe(
      map((response:IResponse<RankSalary[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };
  getAllWithParam(parameters:RankSalaryParameters){

    var httpParams = new HttpParams();

    if(parameters.pageIndex != null && parameters.pageIndex > 0){
      httpParams = httpParams.append("pageIndex",parameters.pageIndex);
    }
    if(parameters.pageSize != null && parameters.pageSize > 0){
      httpParams = httpParams.append("pageSize",parameters.pageSize);
    }
    if(parameters.rankId!=null && parameters.rankId > 0){
      httpParams = httpParams.append("rankId",parameters.rankId);
    }
    return this.http.get<IPagination<RankSalary>>(this.baseApiUrl + "/RankSalary/All",{observe:"response",params:httpParams})
      .pipe(
          map(response=>{
              return response.body;
            }),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:RankSalary):Observable<IResponse<RankSalary>>{
    return this.http.post<IResponse<RankSalary>>(this.baseApiUrl + "/RankSalary/Create",model).pipe(
      map((response:IResponse<RankSalary>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:RankSalary):Observable<IResponse<RankSalary>>{
    return this.http.put<IResponse<RankSalary>>(this.baseApiUrl + "/RankSalary/Update?Id="+id,model).pipe(
      map((response:IResponse<RankSalary>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Delete(id:number):Observable<IResponse<RankSalary>>{
    return this.http.delete<IResponse<RankSalary>>(this.baseApiUrl + "/RankSalary/Delete?Id="+id).pipe(
      map((response:IResponse<RankSalary>)=>{
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
