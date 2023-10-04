import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AreaParameters} from "../shared/parameters/areaParameters";
import {Observable} from "rxjs";
import {IPagination} from "../shared/helpers/pagination";
import {Area} from "../shared/models/system/area";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {VacancyParameters} from "../shared/parameters/vacancyParameters";
import {Vacancy} from "../shared/models/vacancy/vacancy";
import {VacancyExecutorParameters} from "../shared/parameters/vacancyExecutorParameters";
import {ArmyDepartment} from "../shared/models/system/armyDepartment";
import {IResponse} from "../shared/models/common/response";
import {AppConfigService} from "../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class ExecutorVacancyService {

  baseApiUrl : string = '';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private appConfigService: AppConfigService) {
    this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getAllWithParam(parameters:VacancyExecutorParameters):Observable<IPagination<Area>>{
    let httpParams = new HttpParams();
    if(parameters.search != null && parameters.search.length){
      httpParams = httpParams.append("search",parameters.search.toString())
    }
    if(parameters.pageIndex != null && parameters.pageIndex > 0){
      httpParams = httpParams.append("pageIndex",parameters.pageIndex.toString())
    }
    if(parameters.pageSize != null && parameters.pageSize > 0){
      httpParams = httpParams.append("pageSize",parameters.pageSize.toString())
    }
    if(parameters.armyRegionId != null && parameters.armyRegionId > 0){
      httpParams = httpParams.append("ArmyRegionId",parameters.armyRegionId.toString())
    }
    if(parameters.armyTypeId != null && parameters.armyTypeId > 0){
      httpParams = httpParams.append("ArmyTypeId",parameters.armyTypeId.toString())
    }
    if(parameters.jobCategoryId != null && parameters.jobCategoryId > 0){
      httpParams = httpParams.append("JobCategoryId",parameters.jobCategoryId.toString())
    }
    if(parameters.positionId != null && parameters.positionId > 0){
      httpParams = httpParams.append("PositionId",parameters.positionId.toString())
    }
    if(parameters.qualificationId != null && parameters.qualificationId > 0){
      httpParams = httpParams.append("QualificationId",parameters.qualificationId.toString())
    }
    if(parameters.secretLevelId != null && parameters.secretLevelId > 0){
      httpParams = httpParams.append("SecretLevelId",parameters.secretLevelId.toString())
    }

    // @ts-ignore
    return this.http.get<IPagination<Vacancy>>(this.baseApiUrl + "/Vacancy/MyAll", {observe:"response",params:httpParams}).pipe(
      //@ts-ignore
      map(response => {
        // @ts-ignore
        return  response.body;
      }),
      distinct(),
      shareReplay(),
    )
  };

  Create(model:Vacancy):Observable<IResponse<Vacancy>>{
    return this.http.post<IResponse<Vacancy>>(this.baseApiUrl + "/Vacancy/Create",model).pipe(
      map((response:IResponse<Vacancy>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  Update(id:number,model:Vacancy):Observable<IResponse<Vacancy>>{
    return this.http.put<IResponse<Vacancy>>(this.baseApiUrl + "/Vacancy/Update?Id="+id,model).pipe(
      map((response:IResponse<Vacancy>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
  };

  getForUpdate(id:number):Observable<IResponse<Vacancy>>{
    return this.http.get<IResponse<Vacancy>>(this.baseApiUrl + "/Vacancy/GetForUpdate?Id="+id).pipe(
      map((response:IResponse<Vacancy>)=>{
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
    return this.http.delete<IResponse<boolean>>(this.baseApiUrl + "/Vacancy/Delete?Id="+id).pipe(
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
