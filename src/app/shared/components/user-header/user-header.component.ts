import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../../auth/auth.service";
import {IResponse} from "../../models/common/response";
import {IUser} from "../../models/user/user";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {GlobalTranslateService} from "../../services/common/global-translate.service";

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  // @ts-ignore
  currentUser$: Observable<IResponse<IUser>>;
  isLoggedIn:boolean = false

  constructor(private authService: AuthService, private translateService: TranslateService, public translate: GlobalTranslateService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn()
    this.currentUser$ = this.authService.currentUser$
    this.translate.getCurrentLang()
  }

  logout() {
    this.authService.logout()
  }
}
