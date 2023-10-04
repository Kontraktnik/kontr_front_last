import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import {JobCategory} from "../models/calculation/jobCategory";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class JobCategoryService {
  //@ts-ignore
  jobCategoryAll$:Observable<IResponse<JobCategory[]>>;
  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getById(Id:number):Observable<IResponse<JobCategory>>{
    return this.http.get<IResponse<JobCategory>>(this.baseApiUrl + "/JobCategory/GetById?Id="+Id.toString()).pipe(
      map((response:IResponse<JobCategory>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll(useCache:boolean = false):Observable<IResponse<JobCategory[]>>{
    if(useCache  &&this.jobCategoryAll$){
      return this.jobCategoryAll$;
    }
    this.jobCategoryAll$ = this.http.get<IResponse<JobCategory[]>>(this.baseApiUrl + "/JobCategory/GetAll").pipe(
      map((response:IResponse<JobCategory[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    );
    return this.jobCategoryAll$;
  };
  getAllWithParam():Observable<IPagination<JobCategory[]>>{
    return this.http.get<IPagination<JobCategory[]>>(this.baseApiUrl + "/JobCategory/All").pipe(
      map((response:IPagination<JobCategory[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:JobCategory):Observable<IResponse<JobCategory>>{
    return this.http.post<IResponse<JobCategory>>(this.baseApiUrl + "/JobCategory/Create",model).pipe(
      map((response:IResponse<JobCategory>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:JobCategory):Observable<IResponse<JobCategory>>{
    return this.http.put<IResponse<JobCategory>>(this.baseApiUrl + "/JobCategory/Update?Id="+id,model).pipe(
      map((response:IResponse<JobCategory>)=>{
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
    return this.http.delete<IResponse<boolean>>(this.baseApiUrl + "/JobCategory/Delete?Id="+id).pipe(
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
