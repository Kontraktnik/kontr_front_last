import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { IndexComponent } from './index/index.component';
import { VacancyComponent } from './vacancy/vacancy.component';
import {SharedModule} from "../shared/shared.module";
import {NgxPaginationModule} from "ngx-pagination";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {TranslateModule} from "@ngx-translate/core";
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


@NgModule({
  declarations: [
    HomeLayoutComponent,
        IndexComponent,
        VacancyComponent,
        PrivacyPolicyComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        NgxPaginationModule,
        AutocompleteLibModule,
        TranslateModule,
    ]
})
export class HomeModule { }
