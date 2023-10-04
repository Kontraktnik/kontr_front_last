import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IUser} from "../../models/user/user";
import {AuthService} from "../../../auth/auth.service";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Roles} from "../../constants/roles";
import {IResponse} from "../../models/common/response";
import {GlobalTranslateService} from "../../services/common/global-translate.service";

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss']
})
export class CommonHeaderComponent implements OnInit {
  // @ts-ignore
  currentUser$: Observable<IResponse<IUser>>;
  isLoggedIn:boolean = false
  isUser:boolean = false

  constructor(private authService: AuthService, private router: Router, public translate: GlobalTranslateService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn()
    this.currentUser$ = this.authService.currentUser$
    this.translate.getCurrentLang()
    if (this.authService.isUserLoggedIn()) {
      this.currentUser$.subscribe(res => {
        if (res.data.roleId == Roles.USER) {
          this.isUser = true
        }
      })
    } else {
      this.isUser = true
    }
  }

  logout() {
    this.authService.logout()
  }

}
