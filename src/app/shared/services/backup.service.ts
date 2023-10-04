import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {ArmyType} from "../models/system/armyType";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {Backup} from "../models/file/backup";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class BackupService {

  baseApiUrl:string = '';
  //@ts-ignore

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }


  getBackups(){
    return this.http.get<Backup[]>(this.baseApiUrl + "/BackUp/GetAllBackups").pipe(
      map((response:Backup[])=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    );
  }

  generateBackup(parameters:string[] = []){
    let params = new HttpParams();
    if (parameters.length>0){
      for (let item of parameters){
        console.log(item)
        params = params.append("tables",item.toString());
      }
    }
    console.log(params);

    return this.http.get<string>(this.baseApiUrl + "/BackUp/GenerateBackupFile",{ observe: 'response', params:params }).pipe(
      map((response)=>{
          return response.body;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    );
  }

  importBackup(fullPath:string){
    return this.http.post<boolean>(this.baseApiUrl + "/BackUp/ImportBackUpFile?filePath="+ fullPath,{}).pipe(
      map((response:boolean)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    );
  }
  deleteBackup(fullPath:string){
    return this.http.get<boolean>(this.baseApiUrl + "/BackUp/DeleteBackup?filePath="+ fullPath).pipe(
      map((response:boolean)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    );
  }





}
