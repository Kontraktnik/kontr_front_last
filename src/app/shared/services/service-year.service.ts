import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import {ServiceYear} from "../models/calculation/serviceYear";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class ServiceYearService {
  //@ts-ignore
  oldServiceAll:Observable<IResponse<ServiceYear[]>>;

  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(Id:number):Observable<IResponse<ServiceYear>>{
    return this.http.get<IResponse<ServiceYear>>(this.baseApiUrl + "/ServiceYear/GetById?Id="+Id.toString()).pipe(
      map((response:IResponse<ServiceYear>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll(useCache:boolean = false):Observable<IResponse<ServiceYear[]>>{
    if(useCache && this.oldServiceAll){
      return this.oldServiceAll;
    }
    this.oldServiceAll = this.http.get<IResponse<ServiceYear[]>>(this.baseApiUrl + "/ServiceYear/GetAll").pipe(
      map((response:IResponse<ServiceYear[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    );
    return this.oldServiceAll;
  };
  getAllWithParam():Observable<IPagination<ServiceYear>>{
    return this.http.get<IPagination<ServiceYear>>(this.baseApiUrl + "/ServiceYear/All").pipe(
      map((response:IPagination<ServiceYear>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:ServiceYear):Observable<IResponse<ServiceYear>>{
    return this.http.post<IResponse<ServiceYear>>(this.baseApiUrl + "/ServiceYear/Create",model).pipe(
      map((response:IResponse<ServiceYear>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:ServiceYear):Observable<IResponse<ServiceYear>>{
    return this.http.put<IResponse<ServiceYear>>(this.baseApiUrl + "/ServiceYear/Update?Id="+id,model).pipe(
      map((response:IResponse<ServiceYear>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Delete(id:number):Observable<IResponse<boolean>>{
    return this.http.delete<IResponse<boolean>>(this.baseApiUrl + "/ServiceYear/Delete?Id="+id).pipe(
      map((response:IResponse<boolean>)=>{
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
