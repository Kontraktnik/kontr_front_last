import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectorRoutingModule } from './director-routing.module';
import { ReceivedRequestsComponent } from './director-requests/received-requests/received-requests.component';
import { AgreedRequestsComponent } from './director-requests/agreed-requests/agreed-requests.component';
import { SignedRequestsComponent } from './director-requests/signed-requests/signed-requests.component';
import { RejectedRequestsComponent } from './director-requests/rejected-requests/rejected-requests.component';
import { DossierComponent } from './director-requests/dossier/dossier.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import { StatisticsComponent } from './director-requests/statistics/statistics.component';
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import { AllRequestsComponent } from './director-requests/all-requests/all-requests.component';
import {SharedModule} from "../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    ReceivedRequestsComponent,
    AgreedRequestsComponent,
    SignedRequestsComponent,
    RejectedRequestsComponent,
    DossierComponent,
    StatisticsComponent,
    AllRequestsComponent
  ],
    imports: [
        CommonModule,
        DirectorRoutingModule,
        FontAwesomeModule,
        FormsModule,
        NgxPaginationModule,
        AutocompleteLibModule,
        SharedModule,
        TranslateModule
    ]
})
export class DirectorModule { }
