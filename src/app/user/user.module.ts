import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { AllRequestComponent } from './user-request/all-request/all-request.component';
import { CreateRequestComponent } from './user-request/create-request/create-request.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { SavedRequestComponent } from './user-request/saved-request/saved-request.component';
import { UpdateRequestComponent } from './user-request/update-request/update-request.component';
import { ShowRequestComponent } from './user-request/show-request/show-request.component';
import {SharedModule} from "../shared/shared.module";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {FormsModule} from "@angular/forms";
import {WebcamModule} from "ngx-webcam";
import {IMaskModule} from "angular-imask";
import {RxReactiveFormsModule} from "@rxweb/reactive-form-validators";
import {NgxPaginationModule} from "ngx-pagination";
import { OpenRequestComponent } from './user-request/open-request/open-request.component';
import { ApplyRequestComponent } from './user-request/apply-request/apply-request.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    UserLayoutComponent,
    AllRequestComponent,
    CreateRequestComponent,
    SavedRequestComponent,
    UpdateRequestComponent,
    ShowRequestComponent,
    OpenRequestComponent,
    ApplyRequestComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FontAwesomeModule,
        SharedModule,
        NgMultiSelectDropDownModule,
        FormsModule,
        WebcamModule,
        IMaskModule,
        RxReactiveFormsModule,
        NgxPaginationModule,
        TranslateModule
    ]
})
export class UserModule { }
