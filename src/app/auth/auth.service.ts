import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, distinct, map, share} from "rxjs/operators";
import {Router} from "@angular/router";
import {IUser} from "../shared/models/user/user";
import {Roles} from "../shared/constants/roles";
import {IResponse} from "../shared/models/common/response";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AppConfigService} from "../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApiUrl = '';
  isLoggedIn: boolean;
  // @ts-ignore
  private currentUserSource: ReplaySubject<IResponse<IUser>> = new ReplaySubject<IResponse<IUser>>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient, private router: Router, private appConfigService: AppConfigService) {
    this.isLoggedIn = false;
    this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  jwtHelper = new JwtHelperService();
  loadCurrentUser(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseApiUrl + "/auth/getMe", {headers}).pipe(
      // @ts-ignore
      map((user:IResponse<IUser>) => {
        if (user) {
          this.isLoggedIn = true
          localStorage.setItem('token', token);
          this.currentUserSource.next(user)
        }
      }),
      distinct(),
      share()
    )
  }

  login(values: any) {
    return this.http.post(this.baseApiUrl + "/auth/login", values).pipe(
      // @ts-ignore
      map((response) => {
        let user:IResponse<IUser> = {
          // @ts-ignore
          success: response.success,
          // @ts-ignore
            data: {
              // @ts-ignore
              roleId: response.data.userDto.roleId,
              // @ts-ignore
              jwtToken: response.data.jwtToken,
              // @ts-ignore
              fullName: response.data.userDto.fullName,
              // @ts-ignore
              iin: response.data.userDto.iin,
              // @ts-ignore
              email: response.data.userDto.email,
              // @ts-ignore
              phone: response.data.userDto.phone
            }
          }
          localStorage.setItem('token', user.data.jwtToken);
          this.currentUserSource.next(user)
          this.isLoggedIn = true
          return user
      },catchError(error => {
        return error
      }))
    )
  }

  register(values: any) {
    return this.http.post(this.baseApiUrl + "/auth/register", values).pipe(
      // @ts-ignore
      map((response:IResponse<boolean>) => {
        return response
        }, catchError(error => {
          console.log(error)
          return error
        })
      )
    )
  }

  verify(values: any) {
    return this.http.post(this.baseApiUrl + "/auth/Verify", values).pipe(
      // @ts-ignore
      map((response:IResponse<boolean>) => {
          return response
        }, catchError(error => {
          console.log(error)
          return error
        })
      )
    )
  }
  sendNotification(iin:string) {
    return this.http.post(this.baseApiUrl + "/PhoneNotification/SendConfCode?IIN="+iin,{}).pipe(
      // @ts-ignore
      map((response:IResponse<boolean>) => {
          return response
        }, catchError(error => {
          console.log(error)
          return error
        })
      )
    )
  }

  isUserLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    // @ts-ignore
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    this.isLoggedIn = false
    localStorage.removeItem('token')
    // @ts-ignore
    this.currentUserSource.next(null)
    this.router.navigateByUrl('/auth/login')
  }

  loginByEcp(request: any) {
    return this.http.post(this.baseApiUrl + "/auth/login/ByEcp", request).pipe(
      // @ts-ignore
      map((response: any) => {
        console.log(response)
        if(response.success){
          let user:IResponse<IUser> = {
            // @ts-ignore
            success: response.success,
            // @ts-ignore
            data: {
              // @ts-ignore
              roleId: response.data.userDto.roleId,
              // @ts-ignore
              jwtToken: response.data.jwtToken,
              // @ts-ignore
              fullName: response.data.userDto.fullName,
              // @ts-ignore
              iin: response.data.userDto.iin,
              // @ts-ignore
              email: response.data.userDto.email,
              // @ts-ignore
              phone: response.data.userDto.phone
            }
          }
          localStorage.setItem('token', user.data.jwtToken);
          this.currentUserSource.next(user)
          this.isLoggedIn = true
          return user
        }
        else{
          return null;
        }
      },catchError(error => {
        return error
      }))
    )
  }
}
