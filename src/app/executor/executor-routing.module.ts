import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExecutorLayoutComponent} from "./executor-layout/executor-layout.component";
import {ReceivedRequestsComponent} from "./executor-requests/received-requests/received-requests.component";
import {MedRequestsComponent} from "./executor-requests/med-requests/med-requests.component";
import {AcceptedRequestsComponent} from "./executor-requests/accepted-requests/accepted-requests.component";
import {InspectedRequestsComponent} from "./executor-requests/inspected-requests/inspected-requests.component";
import {AgreedRequestsComponent} from "./executor-requests/agreed-requests/agreed-requests.component";
import {SignedRequestsComponent} from "./executor-requests/signed-requests/signed-requests.component";
import {RejectedRequestsComponent} from "./executor-requests/rejected-requests/rejected-requests.component";
import {DossierComponent} from "./executor-requests/dossier/dossier.component";
import {VacanciesAllComponent} from "./executor-vacancies/vacancies-all/vacancies-all.component";
import {VacanciesCreateComponent} from "./executor-vacancies/vacancies-create/vacancies-create.component";
import {VacanciesUpdateComponent} from "./executor-vacancies/vacancies-update/vacancies-update.component";
import {VacanciesShowComponent} from "./executor-vacancies/vacancies-show/vacancies-show.component";
import {PsychoRequestComponent} from "./executor-requests/psycho-request/psycho-request.component";
import {AllRequestsComponent} from "./executor-requests/all-requests/all-requests.component";


const routes: Routes = [
  {
    path:"executor",
    component:ExecutorLayoutComponent,
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
        path:"inspected-requests",
        component:InspectedRequestsComponent,
      },
      {
        path:"med-requests",
        component:MedRequestsComponent,
      },
      {
        path:"psycho-requests",
        component:PsychoRequestComponent,
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
        path:"all-requests",
        component:AllRequestsComponent,
      },
      {
        path:"dossier/:id/:profileId",
        component:DossierComponent,
      },
      {
        path:"vacancies",
        component:VacanciesAllComponent,
      },
      {
        path:"vacancy-create",
        component:VacanciesCreateComponent,
      },
      {
        path:"vacancy-update/:id",
        component:VacanciesUpdateComponent,
      },
      {
        path:"vacancy-show",
        component:VacanciesShowComponent,
      },


    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExecutorRoutingModule { }
