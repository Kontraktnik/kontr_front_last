import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KnbRoutingModule } from './knb-routing.module';
import { KnbLayoutComponent } from './knb-layout/knb-layout.component';
import { ReceivedRequestsComponent } from './knb-requests/received-requests/received-requests.component';
import { AcceptedRequestsComponent } from './knb-requests/accepted-requests/accepted-requests.component';
import { RejectedRequestsComponent } from './knb-requests/rejected-requests/rejected-requests.component';
import { DossierComponent } from './knb-requests/dossier/dossier.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedModule} from "../shared/shared.module";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    KnbLayoutComponent,
    ReceivedRequestsComponent,
    AcceptedRequestsComponent,
    RejectedRequestsComponent,
    DossierComponent
  ],
    imports: [
        CommonModule,
        KnbRoutingModule,
        FontAwesomeModule,
        SharedModule,
        NgxPaginationModule,
        FormsModule
    ]
})
export class KnbModule { }
