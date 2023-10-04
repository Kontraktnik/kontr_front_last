import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {KnbLayoutComponent} from "./knb-layout/knb-layout.component";
import {ReceivedRequestsComponent} from "./knb-requests/received-requests/received-requests.component";
import {RejectedRequestsComponent} from "./knb-requests/rejected-requests/rejected-requests.component";
import {AcceptedRequestsComponent} from "./knb-requests/accepted-requests/accepted-requests.component";
import {DossierComponent} from "./knb-requests/dossier/dossier.component";

const routes: Routes = [
  {
    path:"knb",
    component:KnbLayoutComponent,
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
        path:"accepted-requests",
        component:AcceptedRequestsComponent,
      },
      {
        path:"rejected-requests",
        component:RejectedRequestsComponent,
      },
      {
        path:"dossier/:id/:profileId",
        component:DossierComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnbRoutingModule { }
