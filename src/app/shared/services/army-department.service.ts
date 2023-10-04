import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import {ArmyDepartment} from "../models/system/armyDepartment";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class ArmyDepartmentService {

  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(Id:number):Observable<IResponse<ArmyDepartment>>{
    return this.http.get<IResponse<ArmyDepartment>>(this.baseApiUrl + "/ArmyDepartment/GetById?Id="+Id.toString()).pipe(
      map((response:IResponse<ArmyDepartment>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll():Observable<IResponse<ArmyDepartment[]>>{
    return this.http.get<IResponse<ArmyDepartment[]>>(this.baseApiUrl + "/ArmyDepartment/All").pipe(
      map((response:IResponse<ArmyDepartment[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };
  getAllWithParam():Observable<IPagination<ArmyDepartment>>{
    return this.http.get<IPagination<ArmyDepartment>>(this.baseApiUrl + "/ArmyDepartment/GetAll").pipe(
      map((response:IPagination<ArmyDepartment>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:ArmyDepartment):Observable<IResponse<ArmyDepartment>>{
    return this.http.post<IResponse<ArmyDepartment>>(this.baseApiUrl + "/ArmyDepartment/Create",model).pipe(
      map((response:IResponse<ArmyDepartment>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:ArmyDepartment):Observable<IResponse<ArmyDepartment>>{
    return this.http.put<IResponse<ArmyDepartment>>(this.baseApiUrl + "/ArmyDepartment/Update?Id="+id,model).pipe(
      map((response:IResponse<ArmyDepartment>)=>{
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
    return this.http.delete<IResponse<boolean>>(this.baseApiUrl + "/ArmyDepartment/Delete?Id="+id).pipe(
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
