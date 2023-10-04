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
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private toastrService:ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      if (this.authService.isUserLoggedIn()) {
        return this.authService.currentUser$.pipe(
          map(auth => {
            if (auth) {
              return true
            }
            this.toastrService.warning("Для продолжения вам нужно войти в личный кабинет")
            // this.router.navigateByUrl('/auth/login')
            this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}})
            return false
          })
        )
      } else {
        this.toastrService.warning("Для продолжения вам нужно войти в личный кабинет")
        // this.router.navigateByUrl('/auth/login')
        this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}})
        // @ts-ignore
        return false
      }
    }

}
