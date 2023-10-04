import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {Qualification} from "../models/calculation/qualification";
import {Role} from "../models/user/role";
import {HttpClient} from "@angular/common/http";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  //@ts-ignore
  roleAll:Observable<IResponse<Role[]>>;
  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getAll(useCache:boolean = false):Observable<IResponse<Role[]>>{
    if(useCache && this.roleAll){
      return this.roleAll;
    }
    this.roleAll = this.http.get<IResponse<Role[]>>(this.baseApiUrl + "/Role/GetAll").pipe(
      map((response:IResponse<Role[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    )
    return this.roleAll;
  };

}
