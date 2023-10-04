import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MedLayoutComponent} from "./med-layout/med-layout.component";
import {ReceivedRequestsComponent} from "./med-requests/received-requests/received-requests.component";
import {DossierComponent} from "./med-requests/dossier/dossier.component";
import {AcceptedRequestsComponent} from "./med-requests/accepted-requests/accepted-requests.component";
import {RejectedRequestsComponent} from "./med-requests/rejected-requests/rejected-requests.component";
import {
  ReceivedPsychoRequestsComponent
} from "./med-requests/received-psycho-requests/received-psycho-requests.component";

const routes: Routes = [
  {
    path:"med",
    component:MedLayoutComponent,
    children:[
      {
        path:"",
        component:ReceivedRequestsComponent
      },
      {
        path:"received-requests",
        component:ReceivedRequestsComponent
      },
      {
        path:"received-psycho-requests",
        component:ReceivedPsychoRequestsComponent
      },
      {
        path:"accepted-requests",
        component:AcceptedRequestsComponent
      },
      {
        path:"rejected-requests",
        component:RejectedRequestsComponent
      },
      {
        path:"dossier/:id/:profileId",
        component:DossierComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedRoutingModule { }
