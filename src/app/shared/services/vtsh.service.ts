import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import {Vtsh} from "../models/system/vtsh";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class VtshService {
  //@ts-ignore
  allVtshData:Observable<IResponse<Vtsh[]>>;
  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(Id:number):Observable<IResponse<Vtsh>>{
    return this.http.get<IResponse<Vtsh>>(this.baseApiUrl + "/VTSh/GetById?Id="+Id.toString()).pipe(
      map((response:IResponse<Vtsh>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll(useCache:boolean = false):Observable<IResponse<Vtsh[]>>{
    if(useCache && this.allVtshData){
      return this.allVtshData;
    }
    this.allVtshData = this.http.get<IResponse<Vtsh[]>>(this.baseApiUrl + "/VTSh/GetAll").pipe(
      map((response:IResponse<Vtsh[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
    return this.allVtshData;
  };
  getAllWithParam():Observable<IPagination<Vtsh[]>>{
    return this.http.get<IPagination<Vtsh[]>>(this.baseApiUrl + "/VTSh/All").pipe(
      map((response:IPagination<Vtsh[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:Vtsh):Observable<IResponse<Vtsh>>{
    return this.http.post<IResponse<Vtsh>>(this.baseApiUrl + "/VTSh/Create",model).pipe(
      map((response:IResponse<Vtsh>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:Vtsh):Observable<IResponse<Vtsh>>{
    return this.http.put<IResponse<Vtsh>>(this.baseApiUrl + "/VTSh/Update?Id="+id,model).pipe(
      map((response:IResponse<Vtsh>)=>{
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
    return this.http.delete<IResponse<boolean>>(this.baseApiUrl + "/VTSh/Delete?Id="+id).pipe(
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
