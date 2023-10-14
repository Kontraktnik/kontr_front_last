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


  calculateBirthDay(iin: string): Date {
    if (!iin || iin.length < 6)  {
      return new Date(); // You may want to handle this differently
    }

    const year = Number(iin.substring(0, 2));
    const month = Number(iin.substring(2, 4));
    const day = Number(iin.substring(4, 6));

    const century = year < new Date().getFullYear() % 100 ? Century.Twenty : Century.Nineteen;
    return new Date((century * 100 + year) + '-' + iin.substring(2, 4) + '-' + iin.substring(4, 6));
  }

  calculateGender(iin: string): GenderEnum {
    if (!iin || iin.length < 6) {
      return GenderEnum.Unknown;
    }

    const genderDigit = Number(iin.charAt(6));

    switch (genderDigit) {
      case 1:
      case 3:
      case 5:
        return GenderEnum.Male;
      case 2:
      case 4:
      case 6:
        return GenderEnum.Female;
      default:
        return GenderEnum.Unknown;
    }
  }

  // validateIIN(iin: string): boolean {
  //   if (!/^[0-9]{12}$/.test(iin)) {
  //     return false;
  //   }
  //   const w1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  //   const w2 = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2];
  //   let checkSum = this.multiply(iin, w1) % 11;
  //   if (checkSum === 10) {
  //     checkSum = this.multiply(iin, w2) % 11;
  //   }
  //   if (checkSum !== parseInt(iin.charAt(11), 10)) {
  //     console.log('iin is not ok')
  //     return false;
  //   }
  //   console.log('all ok')
  //   return true;
  // }
  //
  // multiply(iin: string, weights: number[]): number {
  //   const result = iin
  //     .split('')
  //     .map((char, index) => parseInt(char, 10) * weights[index])
  //     .reduce((acc, val) => acc + val, 0);
  //   return result;
  // }

  iinCheck(iin: string, clientType: number, birthDate: Date, sex: boolean, isResident: boolean) {
//clientType: 1 - Физ. лицо (ИИН), 2 - Юр. лицо (БИН)
//birthDate: дата рождения (в формате Javascript Date)
//sex: true - м, false - ж
//isResident: true - резидент, false: нерезидент (true: по умолчанию)
    isResident = isResident || true;
    if(!iin) return false;
    if(iin.length!=12) return false;
    if(!(/[0-9]{12}/.test(iin))) return false;
    switch(clientType){
      case 1:
//Физ. лицо
//Проверяем первый фасет на совпадение с датой рождения ГГММДД
        if(iin.substring(0, 6)!=(
          "" +
          (birthDate.getFullYear()) +
          ((birthDate.getMonth()+1)<10?"0":"")+
          (birthDate.getMonth()+1)+
          (birthDate.getDate()<10?"0":"")+
          birthDate.getDate())) return false;
//Проверяем пол и век рождения
        let s = parseInt(iin.substring(6, 7));
        if(((s%2)==1)!=sex) return false;
        if(
          birthDate.getFullYear()<(1800+(s/2*100))
          || birthDate.getFullYear()>(1900+(s/2*100))) return false;
        break;
      case 2:
//Юр. лицо
//Проверяем корректность даты (насколько это возможно)
        var m = parseInt(iin.substring(2, 4));
        if(m>12) return false;
//Проверяем признак резидентства
        var r = parseInt(iin.substring(4, 5));
        if(r<4 || r>6 || (r==4 && !isResident) || (r==5 && isResident)) return false;
        break;
    }
//Проверяем контрольный разряд
    var b1 = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
    var b2 = [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2 ];
    var a = [];
    var controll = 0;
    for(var i=0; i<12; i++){
      a[i] = parseInt(iin.substring(i, i+1));
      if(i<11) controll += a[i]*b1[i];
    }
    controll = controll % 11;
    if(controll==10) {
      alert("s");
      controll = 0;
      for(var i=0; i<11; i++)
        controll += a[i]*b2[i];
      controll = controll % 11;
    }
    if(controll!=a[11]) return false;
    console.log('hello gi all ok')
    return true;
  }

}


export enum GenderEnum {
  Male = 0,
  Female = 1,
  Unknown = 2,
}

export enum Century {
  Twenty = 20,
  Nineteen = 19,
}
