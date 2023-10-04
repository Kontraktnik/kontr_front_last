import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import {SecretLevel} from "../models/calculation/secretLevel";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class SecretLevelService {

  //@ts-ignore
  secretLevelAll$:Observable<IResponse<SecretLevel[]>>;

  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(Id:number):Observable<IResponse<SecretLevel>>{
    return this.http.get<IResponse<SecretLevel>>(this.baseApiUrl + "/SecretLevel/GetById?Id="+Id.toString()).pipe(
      map((response:IResponse<SecretLevel>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll(useCache:boolean = false):Observable<IResponse<SecretLevel[]>>{
    if(useCache && this.secretLevelAll$){
      return this.secretLevelAll$;
    }
    this.secretLevelAll$ =  this.http.get<IResponse<SecretLevel[]>>(this.baseApiUrl + "/SecretLevel/All").pipe(
      map((response:IResponse<SecretLevel[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
    return this.secretLevelAll$;
  };
  getAllWithParam():Observable<IPagination<SecretLevel>>{
    return this.http.get<IPagination<SecretLevel>>(this.baseApiUrl + "/SecretLevel/GetAll").pipe(
      map((response:IPagination<SecretLevel>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:SecretLevel):Observable<IResponse<SecretLevel>>{
    return this.http.post<IResponse<SecretLevel>>(this.baseApiUrl + "/SecretLevel/Create",model).pipe(
      map((response:IResponse<SecretLevel>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:SecretLevel):Observable<IResponse<SecretLevel>>{
    return this.http.put<IResponse<SecretLevel>>(this.baseApiUrl + "/SecretLevel/Update?Id="+id,model).pipe(
      map((response:IResponse<SecretLevel>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Delete(id:number):Observable<IResponse<SecretLevel>>{
    return this.http.delete<IResponse<SecretLevel>>(this.baseApiUrl + "/SecretLevel/Delete?Id="+id).pipe(
      map((response:IResponse<SecretLevel>)=>{
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
