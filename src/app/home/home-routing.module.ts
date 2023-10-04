import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeLayoutComponent} from "./home-layout/home-layout.component";
import {IndexComponent} from "./index/index.component";
import {VacancyComponent} from "./vacancy/vacancy.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";

const routes: Routes = [
  {
    path:"",
    component:HomeLayoutComponent,
    children:[
      {path:"",component:IndexComponent},
      {path:"vacancy",component:VacancyComponent},
      {path:"privacy-policy",component:PrivacyPolicyComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
