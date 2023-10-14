import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {IUser} from "../../shared/models/user/user";
import {ValidationErrors} from "../../shared/models/common/validation_errors";
import {ActivatedRoute, Router} from "@angular/router";
import {Roles} from "../../shared/constants/roles";
import { initFlowbite } from 'flowbite';
import {ActionSignType, CertUserInfo, SignKeyType} from 'src/app/shared/components/signin/authUserModel';
import {IResponse} from "../../shared/models/common/response";
import {$e} from "@angular/compiler/src/chars";
import {HttpParams} from "@angular/common/http";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  tabType:string = "login";
  returnUrl:string = ''
  errors : ValidationErrors = {status:false,messages:{}};
  // @ts-ignore
  loginForm: FormGroup;

  SignKeyType = SignKeyType;
  ActionSignType = ActionSignType;
  // @ts-ignore
  singRaw: "";
  constructor(private authService: AuthService, private fb: FormBuilder,private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    initFlowbite();
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      iin: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(12),]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe((user) => {
      this.returnToUrl(user);
    }, error => {
      if (error.errors) {
        this.errors.messages = error.errors
        this.errors.status = true
      }
    })
  }

   changeType(tab:string):void{
    this.tabType = tab;
  }

  loginBySign($event: CertUserInfo) {
    this.authService.loginByEcp({iin: $event.number, signText: $event.number}).subscribe((user) => {
      if(user)
        this.returnToUrl(user);
      else{
        // @ts-ignore
        delete $event['keyHash'];
        const queryString = this.convertObjectToQueryString($event);
        this.router.navigateByUrl('/auth/register?' + queryString)
      }
    }, error => {
      if (error.errors) {
        this.errors.messages = error.errors
        this.errors.status = true
      }
    })
  }

  private returnToUrl(user: IResponse<IUser>) {
    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl)
      this.returnUrl = ''
    } else {
      if (user.success) {
        switch (user.data.roleId) {
          case Roles.ADMINISTRATOR: {
            this.router.navigateByUrl('/admin')
            break;
          }
          case Roles.DIRECTOR: {
            this.router.navigateByUrl('/director')
            break;
          }
          case Roles.EXECUTOR: {
            this.router.navigateByUrl('/executor')
            break;
          }
          case Roles.KNB: {
            this.router.navigateByUrl('/knb')
            break;
          }
          case Roles.MED: {
            this.router.navigateByUrl('/med')
            break;
          }
          case Roles.USER: {
            this.router.navigateByUrl('/')
            break;
          }
          default: {
            this.router.navigateByUrl('/')
            break;
          }
        }
      }
    }
  }

  private convertObjectToQueryString(jsonObject: any): string {
    let params = new HttpParams();

    for (const key in jsonObject) {
      if (jsonObject.hasOwnProperty(key)) {
        params = params.set(key, jsonObject[key]);
      }
    }

    return params.toString();
  }
}
