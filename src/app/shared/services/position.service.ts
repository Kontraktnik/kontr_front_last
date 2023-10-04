import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import {Position} from "../models/calculation/position/position";
import {PositionParameters} from "../parameters/positionParameters";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  //@ts-ignore
  oldAllPositions:Observable<IResponse<Position[]>>;
  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(Id:number):Observable<IResponse<Position>>{
    return this.http.get<IResponse<Position>>(this.baseApiUrl + "/Position/GetById?Id="+Id.toString()).pipe(
      map((response:IResponse<Position>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll(useCache:boolean = false):Observable<IResponse<Position[]>>{

    if(this.oldAllPositions && useCache){
      return this.oldAllPositions;
    }
    this.oldAllPositions = this.http.get<IResponse<Position[]>>(this.baseApiUrl + "/Position/GetAll").pipe(
      map((response:IResponse<Position[]>)=>{
        //@ts-ignore
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
    return this.oldAllPositions;
  };
  getAllWithParam(parameters:PositionParameters){
   let params = new HttpParams();
   if(parameters.pageIndex != null && parameters.pageIndex > 0){
     params = params.append("PageIndex",parameters.pageIndex);
   }
    if(parameters.pageSize != null && parameters.pageSize > 0){
      params = params.append("PageSize",parameters.pageSize);
    }
    if(parameters.jobCategoryId != null && parameters.jobCategoryId > 0){
      params = params.append("JobCategoryId",parameters.jobCategoryId);
    }
    if(parameters.secretId != null && parameters.secretId > 0){
      params = params.append("SecretId",parameters.secretId);
    }
    if(parameters.armyTypeId != null && parameters.armyTypeId > 0){
      params = params.append("ArmyTypeId",parameters.armyTypeId);
    }
    if(parameters.categoryPositionId != null && parameters.categoryPositionId > 0){
      params = params.append("CategoryPositionId",parameters.categoryPositionId);
    }
    if(parameters.search != null && parameters.search.length > 0){
      params = params.append("Search",parameters.search);
    }
    return this.http.get<IPagination<Position>>(this.baseApiUrl + "/Position/All",{observe:"response",params:params}).pipe(
      map((response)=>{
          //@ts-ignore
          return response.body;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:Position):Observable<IResponse<Position>>{
    return this.http.post<IResponse<Position>>(this.baseApiUrl + "/Position/Create",model).pipe(
      map((response:IResponse<Position>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:Position):Observable<IResponse<Position>>{
    return this.http.put<IResponse<Position>>(this.baseApiUrl + "/Position/Update?Id="+id,model).pipe(
      map((response:IResponse<Position>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Delete(id:number):Observable<IResponse<Position>>{
    return this.http.delete<IResponse<Position>>(this.baseApiUrl + "/Position/Delete?Id="+id).pipe(
      map((response:IResponse<Position>)=>{
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
