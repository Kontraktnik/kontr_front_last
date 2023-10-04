import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import {MedicalStatus} from "../models/system/medicalStatus";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class MedicalStatusService {

  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(Id:number) {
    return this.http.get<IResponse<MedicalStatus>>(this.baseApiUrl + "/MedicalStatus/GetById?Id="+Id.toString()).pipe(
      map((response:IResponse<MedicalStatus>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll():Observable<IResponse<MedicalStatus[]>>{
    return this.http.get<IResponse<MedicalStatus[]>>(this.baseApiUrl + "/MedicalStatus/All").pipe(
      map((response:IResponse<MedicalStatus[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };
  getAllWithParam():Observable<IPagination<MedicalStatus[]>>{
    return this.http.get<IPagination<MedicalStatus[]>>(this.baseApiUrl + "/MedicalStatus/GetAll").pipe(
      map((response:IPagination<MedicalStatus[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:MedicalStatus):Observable<IResponse<MedicalStatus>>{
    return this.http.post<IResponse<MedicalStatus>>(this.baseApiUrl + "/MedicalStatus/Create",model).pipe(
      map((response:IResponse<MedicalStatus>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:MedicalStatus):Observable<IResponse<MedicalStatus>>{
    return this.http.put<IResponse<MedicalStatus>>(this.baseApiUrl + "/MedicalStatus/Update?Id="+id,model).pipe(
      map((response:IResponse<MedicalStatus>)=>{
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
    return this.http.delete<IResponse<boolean>>(this.baseApiUrl + "/MedicalStatus/Delete?Id="+id).pipe(
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
