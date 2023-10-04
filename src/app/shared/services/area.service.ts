import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {Area} from "../models/system/area";
import {Survey} from "../models/survey/survey";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import {AreaParameters} from "../parameters/areaParameters";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  baseApiUrl: string = '';
  //@ts-ignore
  getAllObservable: Observable<IResponse<Area[]>>;
  //@ts-ignore
  getAllWithSpecObservable: Observable<IResponse<Area[]>>;


  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(Id:number): Observable<IResponse<Area>>{
    return this.http.get<IResponse<Area>>(this.baseApiUrl + "/Area/GetById?Id=" + Id.toString()).pipe(
      map((response:IResponse<Area>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll(useCache:boolean=false):Observable<IResponse<Area[]>>{
    if(useCache && this.getAllObservable){
      return this.getAllObservable;
    }
    this.getAllObservable =  this.http.get<IResponse<Area[]>>(this.baseApiUrl + "/Area/All").pipe(
      map((response:IResponse<Area[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
    return this.getAllObservable;
  };
  getAllWithParam(parameters:AreaParameters):Observable<IPagination<Area>>{
    let httpParams = new HttpParams();
    if(parameters.Search != null && parameters.Search.length){
      httpParams = httpParams.append("search",parameters.Search.toString())
    }
    if(parameters.pageIndex != null && parameters.pageIndex > 0){
      httpParams = httpParams.append("pageIndex",parameters.pageIndex.toString())
    }
    if(parameters.pageSize != null && parameters.pageSize > 0){
      httpParams = httpParams.append("pageSize",parameters.pageIndex.toString())
    }
    // @ts-ignore
    return this.http.get<IPagination<Area>>(this.baseApiUrl + "/Area/GetAll", {observe:"response",httpParams}).pipe(
      //@ts-ignore
      map(response => {
        // @ts-ignore
        return  response.body;
      }),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:Area):Observable<IResponse<Area>>{
    return this.http.post<IResponse<Area>>(this.baseApiUrl + "/Area/Create",model).pipe(
      map((response:IResponse<Area>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:Area):Observable<IResponse<Area>>{
    return this.http.put<IResponse<Area>>(this.baseApiUrl + "/Area/Update?Id="+id.toString(),model).pipe(
      map((response:IResponse<Area>)=>{
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
    return this.http.delete<IResponse<boolean>>(this.baseApiUrl + "/Area/Delete?Id="+id).pipe(
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
