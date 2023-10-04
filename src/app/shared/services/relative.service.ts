import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import {Relative} from "../models/system/relative";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class RelativeService {

  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(Id:number) {
    return this.http.get<IResponse<Relative>>(this.baseApiUrl + "/Relative/GetById?Id="+Id.toString()).pipe(
      map((response:IResponse<Relative>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll():Observable<IResponse<Relative[]>>{
    return this.http.get<IResponse<Relative[]>>(this.baseApiUrl + "/Relative/All").pipe(
      map((response:IResponse<Relative[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };
  getAllWithParam():Observable<IPagination<Relative[]>>{
    return this.http.get<IPagination<Relative[]>>(this.baseApiUrl + "/Relative/GetAll").pipe(
      map((response:IPagination<Relative[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:Relative):Observable<IResponse<Relative>>{
    return this.http.post<IResponse<Relative>>(this.baseApiUrl + "/Relative/Create",model).pipe(
      map((response:IResponse<Relative>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:Relative):Observable<IResponse<Relative>>{
    return this.http.put<IResponse<Relative>>(this.baseApiUrl + "/Relative/Update?Id="+id,model).pipe(
      map((response:IResponse<Relative>)=>{
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
    return this.http.delete<IResponse<boolean>>(this.baseApiUrl + "/Relative/Delete?Id="+id).pipe(
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
