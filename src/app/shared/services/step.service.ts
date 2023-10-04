import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {HttpClient} from "@angular/common/http";
import {Step} from "../models/step/step";
import {ServiceYear} from "../models/calculation/serviceYear";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class StepService {
  //@ts-ignore
  oldStepAll:Observable<IResponse<Step[]>>;

  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getAll(useCache:boolean = false):Observable<IResponse<Step[]>>{
    if(useCache && this.oldStepAll){
      return this.oldStepAll;
    }
    this.oldStepAll = this.http.get<IResponse<Step[]>>(this.baseApiUrl + "/Step/All").pipe(
      map((response:IResponse<Step[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    );
    return this.oldStepAll;
  };


}
