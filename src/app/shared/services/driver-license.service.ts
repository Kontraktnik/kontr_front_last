import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import { DriverLicense } from '../models/system/driverLicense';
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class DriverLicenseService {

  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(Id:number):Observable<IResponse<DriverLicense>>{
    return this.http.get<IResponse<DriverLicense>>(this.baseApiUrl + "/DriverLicense/GetById?Id="+Id.toString()).pipe(
      map((response:IResponse<DriverLicense>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll():Observable<IResponse<DriverLicense[]>>{
    return this.http.get<IResponse<DriverLicense[]>>(this.baseApiUrl + "/DriverLicense/All").pipe(
      map((response:IResponse<DriverLicense[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };
  getAllWithParam():Observable<IPagination<DriverLicense[]>>{
    return this.http.get<IPagination<DriverLicense[]>>(this.baseApiUrl + "/DriverLicense/GetAll").pipe(
      map((response:IPagination<DriverLicense[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:DriverLicense):Observable<IResponse<DriverLicense>>{
    return this.http.post<IResponse<DriverLicense>>(this.baseApiUrl + "/DriverLicense/Create",model).pipe(
      map((response:IResponse<DriverLicense>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:DriverLicense):Observable<IResponse<DriverLicense>>{
    return this.http.put<IResponse<DriverLicense>>(this.baseApiUrl + "/DriverLicense/Update?Id="+id,model).pipe(
      map((response:IResponse<DriverLicense>)=>{
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
    return this.http.delete<IResponse<boolean>>(this.baseApiUrl + "/DriverLicense/Delete?Id="+id).pipe(
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
