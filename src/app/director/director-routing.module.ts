import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DirectorLayoutComponent} from "./director-layout/director-layout.component";
import {ReceivedRequestsComponent} from "./director-requests/received-requests/received-requests.component";
import {AgreedRequestsComponent} from "./director-requests/agreed-requests/agreed-requests.component";
import {DossierComponent} from "./director-requests/dossier/dossier.component";
import {SignedRequestsComponent} from "./director-requests/signed-requests/signed-requests.component";
import {RejectedRequestsComponent} from "./director-requests/rejected-requests/rejected-requests.component";
import {StatisticsComponent} from "./director-requests/statistics/statistics.component";
import {AllRequestsComponent} from "./director-requests/all-requests/all-requests.component";

const routes: Routes = [
  {
    path:"director",
    component:DirectorLayoutComponent,
    children:[
      {
        path:"",
        component:ReceivedRequestsComponent,
      },
      {
        path:"received-requests",
        component:ReceivedRequestsComponent,
      },
      {
        path:"agreed-requests",
        component:AgreedRequestsComponent,
      },
      {
        path:"signed-requests",
        component:SignedRequestsComponent,
      },
      {
        path:"rejected-requests",
        component:RejectedRequestsComponent,
      },
      {
        path:"dossier/:id/:profileId",
        component:DossierComponent,
      },
      {
        path:"statistics",
        component:StatisticsComponent
      },
      {
        path:"all-requests",
        component:AllRequestsComponent
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectorRoutingModule { }
