import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import {Education} from "../models/system/education";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  //@ts-ignore
  allEducationData:Observable<IResponse<Education[]>>;
  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(Id:number):Observable<IResponse<Education>>{
    return this.http.get<IResponse<Education>>(this.baseApiUrl + "/Education/GetById?Id="+Id.toString()).pipe(
      map((response:IResponse<Education>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll(useCache:boolean = false):Observable<IResponse<Education[]>>{
    if(useCache && this.allEducationData){
      return this.allEducationData;
    }
    this.allEducationData = this.http.get<IResponse<Education[]>>(this.baseApiUrl + "/Education/All").pipe(
      map((response:IResponse<Education[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    );
    return this.allEducationData;
  };
  getAllWithParam():Observable<IPagination<Education[]>>{
    return this.http.get<IPagination<Education[]>>(this.baseApiUrl + "/Education/GetAll").pipe(
      map((response:IPagination<Education[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:Education):Observable<IResponse<Education>>{
    return this.http.post<IResponse<Education>>(this.baseApiUrl + "/Education/Create",model).pipe(
      map((response:IResponse<Education>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:Education):Observable<IResponse<Education>>{
    return this.http.put<IResponse<Education>>(this.baseApiUrl + "/Education/Update?Id="+id,model).pipe(
      map((response:IResponse<Education>)=>{
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
    return this.http.delete<IResponse<boolean>>(this.baseApiUrl + "/Education/Delete?Id="+id).pipe(
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
