import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {SharedModule} from "../shared/shared.module";
import { ConfirmComponent } from './confirm/confirm.component';
import {IMaskDirectiveModule} from "angular-imask";
import { VerifyComponent } from './verify/verify.component';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    RegisterComponent,
    LoginComponent,
    ConfirmComponent,
    VerifyComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        IMaskDirectiveModule
    ]
})
export class AuthModule { }
