import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../auth/auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DirectorGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    // @ts-ignore
    return this.authService.currentUser$.pipe(
      map(auth => {
          if (auth.data.roleId == 2) {
            return true
          } else {
            this.router.navigateByUrl('/not-found')
            return false
          }
        }
      )
    )
  }

}
