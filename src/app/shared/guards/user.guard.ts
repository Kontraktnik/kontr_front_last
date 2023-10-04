import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {IUser} from "../models/user/user";
import {AuthService} from "../../auth/auth.service";
import {Roles} from "../constants/roles";
import {map} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      // @ts-ignore
    return this.authService.currentUser$.pipe(
        map(auth => {
          if (auth.data.roleId == 6) {
            return true
          } else {
            this.router.navigateByUrl('/not-found')
            return false
          }
        })
      )
    }

}
