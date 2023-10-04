import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import {Qualification} from "../models/calculation/qualification";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class QualificationService {
  //@ts-ignore
  oldQualificationAll:Observable<IResponse<Qualification[]>>;
  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(Id:number):Observable<IResponse<Qualification>>{
    return this.http.get<IResponse<Qualification>>(this.baseApiUrl + "/Qualification/GetById?Id="+Id.toString()).pipe(
      map((response:IResponse<Qualification>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll(useCache:boolean = false):Observable<IResponse<Qualification[]>>{
    if(useCache && this.oldQualificationAll){
      return this.oldQualificationAll;
    }
    this.oldQualificationAll = this.http.get<IResponse<Qualification[]>>(this.baseApiUrl + "/Qualification/All").pipe(
      map((response:IResponse<Qualification[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
    return this.oldQualificationAll;
  };
  getAllWithParam():Observable<IPagination<Qualification[]>>{
    return this.http.get<IPagination<Qualification[]>>(this.baseApiUrl + "/Qualification/GetAll").pipe(
      map((response:IPagination<Qualification[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:Qualification):Observable<IResponse<Qualification>>{
    return this.http.post<IResponse<Qualification>>(this.baseApiUrl + "/Qualification/Create",model).pipe(
      map((response:IResponse<Qualification>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:Qualification):Observable<IResponse<Qualification>>{
    return this.http.put<IResponse<Qualification>>(this.baseApiUrl + "/Qualification/Update?Id="+id,model).pipe(
      map((response:IResponse<Qualification>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Delete(id:number):Observable<IResponse<Qualification>>{
    return this.http.delete<IResponse<Qualification>>(this.baseApiUrl + "/Qualification/Delete?Id="+id).pipe(
      map((response:IResponse<Qualification>)=>{
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
