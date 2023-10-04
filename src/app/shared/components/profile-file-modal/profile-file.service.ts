import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {IResponse} from "../../models/common/response";
import {ProfileFile} from "../../models/profile/profileFile";
import {Step} from "../../models/step/step";
import {catchError, distinct, map, shareReplay} from "rxjs/operators";
import {AppConfigService} from "../../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileFileService {
  baseApiUrl : string = '';

  constructor(private httpClient: HttpClient, private appConfigService: AppConfigService) {
    this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  sendProfileFile(form:FormData,model:ProfileFile,profileId:number|null){
    let params:HttpParams = new HttpParams();
    if(profileId){
      params = params.append("ProfileId",profileId.toString())
    }
    if(model.comment){
      params = params.append("Comment",model.comment.toString())
    }
    return this.httpClient.post<IResponse<ProfileFile>>(this.baseApiUrl + "/ProfileFile/AddProfileFile",form,{observe:"response",params:params});

  }

  getAll(profileId:number){
    return this.httpClient.get<IResponse<ProfileFile[]>>(this.baseApiUrl + "/ProfileFile/GetAll?ProfileId="+profileId.toString()).pipe(
      map((response:IResponse<ProfileFile[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
      distinct(),
      shareReplay(),
    );
  }

  deleteProfileFile(id:number){
    return this.httpClient.delete<IResponse<boolean>>(this.baseApiUrl + "/ProfileFile/DeleteProfileFile?Id="+id.toString());
  }


}
