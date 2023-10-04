import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserLayoutComponent} from "./user-layout/user-layout.component";
import {AllRequestComponent} from "./user-request/all-request/all-request.component";
import {CreateRequestComponent} from "./user-request/create-request/create-request.component";
import {SavedRequestComponent} from "./user-request/saved-request/saved-request.component";
import {UpdateRequestComponent} from "./user-request/update-request/update-request.component";
import {ShowRequestComponent} from "./user-request/show-request/show-request.component";
import {OpenRequestComponent} from "./user-request/open-request/open-request.component";
import {ApplyRequestComponent} from "./user-request/apply-request/apply-request.component";

const routes: Routes = [
  {
    path:"user",
    component:UserLayoutComponent,
    children:[
      {
        path:"all-request",
        component:AllRequestComponent
      },
      {
        path:"create-request/:id",
        component:CreateRequestComponent,
      },
      {
        path:"open-request/:id",
        component:OpenRequestComponent,
      },
      {
        path:"apply-request",
        component:ApplyRequestComponent,
      },
      // {
      //   path:"update-request",
      //   component:UpdateRequestComponent,
      // },
      {
        path:"show-request/:id",
        component:ShowRequestComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
