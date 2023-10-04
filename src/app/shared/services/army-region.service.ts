import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import {ArmyRegion} from "../models/system/armyRegion";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class ArmyRegionService {
  //@ts-ignore
  allArmyRegion:Observable<IResponse<ArmyRegion[]>>;

  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(Id:number):Observable<IResponse<ArmyRegion>>{
    return this.http.get<IResponse<ArmyRegion>>(this.baseApiUrl + "/ArmyRegion/GetById?Id="+Id.toString()).pipe(
      map((response:IResponse<ArmyRegion>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll(useCache:boolean = false):Observable<IResponse<ArmyRegion[]>>{
      if(useCache && this.allArmyRegion){
        return this.allArmyRegion;
      }

    this.allArmyRegion = this.http.get<IResponse<ArmyRegion[]>>(this.baseApiUrl + "/ArmyRegion/GetAll").pipe(
      map((response:IResponse<ArmyRegion[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
    return this.allArmyRegion;
  };
  getAllWithParam():Observable<IPagination<ArmyRegion[]>>{
    return this.http.get<IPagination<ArmyRegion[]>>(this.baseApiUrl + "/ArmyRegion/All").pipe(
      map((response:IPagination<ArmyRegion[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:ArmyRegion):Observable<IResponse<ArmyRegion>>{
    return this.http.post<IResponse<ArmyRegion>>(this.baseApiUrl + "/ArmyRegion/Create",model).pipe(
      map((response:IResponse<ArmyRegion>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:ArmyRegion):Observable<IResponse<ArmyRegion>>{
    return this.http.put<IResponse<ArmyRegion>>(this.baseApiUrl + "/ArmyRegion/Update?Id="+id,model).pipe(
      map((response:IResponse<ArmyRegion>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Delete(id:number):Observable<IResponse<ArmyRegion>>{
    return this.http.delete<IResponse<ArmyRegion>>(this.baseApiUrl + "/ArmyRegion/Delete?Id="+id).pipe(
      map((response:IResponse<ArmyRegion>)=>{
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
