import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import {ArmyType} from "../models/system/armyType";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class ArmyTypeService {

  baseApiUrl:string = '';
  //@ts-ignore
  armyTypeAll$:Observable<IResponse<ArmyType[]>>;
  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(Id:number):Observable<IResponse<ArmyType>>{
    return this.http.get<IResponse<ArmyType>>(this.baseApiUrl + "/ArmyType/GetById?Id="+Id.toString()).pipe(
      map((response:IResponse<ArmyType>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll(useCache:boolean = false):Observable<IResponse<ArmyType[]>>{
    if(useCache && this.armyTypeAll$){
      return this.armyTypeAll$;
    }
    this.armyTypeAll$ =  this.http.get<IResponse<ArmyType[]>>(this.baseApiUrl + "/ArmyType/GetAll").pipe(
      map((response:IResponse<ArmyType[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    );
    return this.armyTypeAll$;
  };
  getAllWithParam():Observable<IPagination<ArmyType[]>>{
    return this.http.get<IPagination<ArmyType[]>>(this.baseApiUrl + "/ArmyType/All").pipe(
      map((response:IPagination<ArmyType[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:ArmyType):Observable<IResponse<ArmyType>>{
    return this.http.post<IResponse<ArmyType>>(this.baseApiUrl + "/ArmyType/Create",model).pipe(
      map((response:IResponse<ArmyType>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:ArmyType):Observable<IResponse<ArmyType>>{
    return this.http.put<IResponse<ArmyType>>(this.baseApiUrl + "/ArmyType/Update?Id="+id,model).pipe(
      map((response:IResponse<ArmyType>)=>{
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
    return this.http.delete<IResponse<boolean>>(this.baseApiUrl + "/ArmyType/Delete?Id="+id).pipe(
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
