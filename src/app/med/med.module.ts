import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedRoutingModule } from './med-routing.module';
import { ReceivedRequestsComponent } from './med-requests/received-requests/received-requests.component';
import { DossierComponent } from './med-requests/dossier/dossier.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { MedLayoutComponent } from './med-layout/med-layout.component';
import {SharedModule} from "../shared/shared.module";
import { RejectedRequestsComponent } from './med-requests/rejected-requests/rejected-requests.component';
import { AcceptedRequestsComponent } from './med-requests/accepted-requests/accepted-requests.component';
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";
import { ReceivedPsychoRequestsComponent } from './med-requests/received-psycho-requests/received-psycho-requests.component';


@NgModule({
  declarations: [
    ReceivedRequestsComponent,
    DossierComponent,
    MedLayoutComponent,
    RejectedRequestsComponent,
    AcceptedRequestsComponent,
    ReceivedPsychoRequestsComponent,
  ],
    imports: [
        CommonModule,
        MedRoutingModule,
        FontAwesomeModule,
        SharedModule,
        NgxPaginationModule,
        FormsModule
    ]
})
export class MedModule { }
