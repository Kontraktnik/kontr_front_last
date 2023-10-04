import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExecutorRoutingModule} from "./executor-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedModule} from "../shared/shared.module";
import {VacanciesShowComponent} from "./executor-vacancies/vacancies-show/vacancies-show.component";
import {ExecutorLayoutComponent} from "./executor-layout/executor-layout.component";
import {AgreedRequestsComponent} from "./executor-requests/agreed-requests/agreed-requests.component";
import {DossierComponent} from "./executor-requests/dossier/dossier.component";
import {AcceptedRequestsComponent} from "./executor-requests/accepted-requests/accepted-requests.component";
import {InspectedRequestsComponent} from "./executor-requests/inspected-requests/inspected-requests.component";
import {MedRequestsComponent} from "./executor-requests/med-requests/med-requests.component";
import {ReceivedRequestsComponent} from "./executor-requests/received-requests/received-requests.component";
import {RejectedRequestsComponent} from "./executor-requests/rejected-requests/rejected-requests.component";
import {SignedRequestsComponent} from "./executor-requests/signed-requests/signed-requests.component";
import {VacanciesAllComponent} from "./executor-vacancies/vacancies-all/vacancies-all.component";
import {VacanciesCreateComponent} from "./executor-vacancies/vacancies-create/vacancies-create.component";
import {VacanciesUpdateComponent} from "./executor-vacancies/vacancies-update/vacancies-update.component";
import {FormsModule} from "@angular/forms";
import { PsychoRequestComponent } from './executor-requests/psycho-request/psycho-request.component';
import {NgxPaginationModule} from "ngx-pagination";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import { AllRequestsComponent } from './executor-requests/all-requests/all-requests.component';


@NgModule({
  declarations: [
    ExecutorLayoutComponent,
    AcceptedRequestsComponent,
    AgreedRequestsComponent,
    DossierComponent,
    InspectedRequestsComponent,
    MedRequestsComponent,
    ReceivedRequestsComponent,
    RejectedRequestsComponent,
    SignedRequestsComponent,
    VacanciesAllComponent,
    VacanciesCreateComponent,
    VacanciesShowComponent,
    VacanciesUpdateComponent,
    PsychoRequestComponent,
    AllRequestsComponent,
  ],
    imports: [
        CommonModule,
        ExecutorRoutingModule,
        SharedModule,
        FontAwesomeModule,
        FormsModule,
        NgxPaginationModule,
        AutocompleteLibModule
    ]
})
export class ExecutorModule { }
