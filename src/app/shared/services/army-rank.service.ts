import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import {ArmyRank} from "../models/system/armyRank";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class ArmyRankService {
  //@ts-ignore
  oldSubscriber: Observable<IResponse<ArmyRank[]>>;
  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(Id:number):Observable<IResponse<ArmyRank>>{
    return this.http.get<IResponse<ArmyRank>>(this.baseApiUrl + "/ArmyRank/GetById?Id="+Id.toString()).pipe(
      map((response:IResponse<ArmyRank>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll(useCache:boolean = false):Observable<IResponse<ArmyRank[]>>{
    if(this.oldSubscriber && useCache){
      return this.oldSubscriber;
    }
    this.oldSubscriber = this.http.get<IResponse<ArmyRank[]>>(this.baseApiUrl + "/ArmyRank/All").pipe(
      map((response:IResponse<ArmyRank[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
    return this.oldSubscriber;
  };
  getAllWithParam():Observable<IPagination<ArmyRank[]>>{
    return this.http.get<IPagination<ArmyRank[]>>(this.baseApiUrl + "/ArmyRank/GetAll").pipe(
      map((response:IPagination<ArmyRank[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:ArmyRank):Observable<IResponse<ArmyRank>>{
    return this.http.post<IResponse<ArmyRank>>(this.baseApiUrl + "/ArmyRank/Create",model).pipe(
      map((response:IResponse<ArmyRank>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:ArmyRank):Observable<IResponse<ArmyRank>>{
    return this.http.put<IResponse<ArmyRank>>(this.baseApiUrl + "/ArmyRank/Update?Id="+id,model).pipe(
      map((response:IResponse<ArmyRank>)=>{
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
    return this.http.delete<IResponse<boolean>>(this.baseApiUrl + "/ArmyRank/Delete?Id="+id).pipe(
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
