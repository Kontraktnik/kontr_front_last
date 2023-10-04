import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {IPagination} from "../helpers/pagination";
import {CategoryPosition} from "../models/calculation/categoryPosition";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryPositionService {
  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }
  //@ts-ignore
  categoryPositionAll$:Observable<IResponse<CategoryPosition[]>>;

  getById(Id:number):Observable<IResponse<CategoryPosition>>{
    return this.http.get<IResponse<CategoryPosition>>(this.baseApiUrl + "/CategoryPosition/GetById?Id="+Id.toString()).pipe(
      map((response:IResponse<CategoryPosition>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getAll(useCache:boolean = false):Observable<IResponse<CategoryPosition[]>>{
    if(useCache && this.categoryPositionAll$){
      return this.categoryPositionAll$;
    }
    this.categoryPositionAll$ = this.http.get<IResponse<CategoryPosition[]>>(this.baseApiUrl + "/CategoryPosition/GetAll").pipe(
      map((response:IResponse<CategoryPosition[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
    return this.categoryPositionAll$;
  };
  getAllWithParam():Observable<IPagination<CategoryPosition[]>>{
    return this.http.get<IPagination<CategoryPosition[]>>(this.baseApiUrl + "/CategoryPosition/All").pipe(
      map((response:IPagination<CategoryPosition[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:CategoryPosition):Observable<IResponse<CategoryPosition>>{
    return this.http.post<IResponse<CategoryPosition>>(this.baseApiUrl + "/CategoryPosition/Create",model).pipe(
      map((response:IResponse<CategoryPosition>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:CategoryPosition):Observable<IResponse<CategoryPosition>>{
    return this.http.put<IResponse<CategoryPosition>>(this.baseApiUrl + "/CategoryPosition/Update?Id="+id,model).pipe(
      map((response:IResponse<CategoryPosition>)=>{
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
    return this.http.delete<IResponse<boolean>>(this.baseApiUrl + "/CategoryPosition/Delete?Id="+id).pipe(
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
