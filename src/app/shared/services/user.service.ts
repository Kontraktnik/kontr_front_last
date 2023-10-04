import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {Role} from "../models/user/role";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Relative} from "../models/system/relative";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IUser} from "../models/user/user";
import {IPagination} from "../helpers/pagination";
import {UserParameters} from "../parameters/userParameters";
import {Area} from "../models/system/area";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getByIIN(IIN:string) {
    return this.http.get<IResponse<IUser>>(this.baseApiUrl + "/User/GetByIIN?IIN="+IIN.toString()).pipe(
      map((response:IResponse<IUser>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll(parameters:UserParameters) {
    let httpParams = new HttpParams();
    if(parameters.pageIndex != null && parameters.pageIndex > 0){
      httpParams = httpParams.append("PageIndex",parameters.pageIndex)
    }
    if(parameters.pageSize != null && parameters.pageSize > 0){
      httpParams = httpParams.append("PageSize",parameters.pageSize)
    }
    if(parameters.search != null && parameters.search.length > 0){
      httpParams = httpParams.append("Search",parameters.search)
    }
    if(parameters.areaId != null && parameters.areaId > 0){
      httpParams = httpParams.append("AreaId",parameters.areaId)
    }
    if(parameters.roleId != null && parameters.roleId > 0){
      httpParams = httpParams.append("RoleId",parameters.roleId)
    }
    if(parameters.verified !== null){
      httpParams = httpParams.append("Verified",parameters.verified)
    }
    if(parameters.status !== null){
      httpParams = httpParams.append("Status",parameters.status)
    }
    return this.http.get<IPagination<IUser>>(this.baseApiUrl + "/User/All",{observe:"response",params:httpParams}).pipe(
      map((response:HttpResponse<IPagination<IUser>>)=>{
          return response.body;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };


  Create(model:IUser):Observable<IResponse<IUser>>{
    return this.http.post<IResponse<IUser>>(this.baseApiUrl + "/User/Create",model).pipe(
      map((response:IResponse<IUser>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };
  Update(id:number,model:IUser):Observable<IResponse<IUser>>{
    return this.http.put<IResponse<IUser>>(this.baseApiUrl + "/User/Update?Id="+id.toString(),model).pipe(
      map((response:IResponse<IUser>)=>{
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
