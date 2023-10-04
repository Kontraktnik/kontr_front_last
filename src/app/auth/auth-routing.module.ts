import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthLayoutComponent} from "./auth-layout/auth-layout.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {ConfirmComponent} from "./confirm/confirm.component";
import {VerifyComponent} from "./verify/verify.component";

const routes: Routes = [
  {
    path:"auth",
    component:AuthLayoutComponent,
    children:[
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "verify",
        component: VerifyComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
