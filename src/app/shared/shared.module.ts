import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserHeaderComponent} from './components/user-header/user-header.component';
import {AuthHeaderComponent} from './components/auth-header/auth-header.component';
import {RouterModule} from "@angular/router";
import {AuthFooterComponent} from './components/auth-footer/auth-footer.component';
import {CommonHeaderComponent} from './components/common-header/common-header.component';
import {UserFooterComponent} from './components/user-footer/user-footer.component';
import {CommonFooterComponent} from './components/common-footer/common-footer.component';
import {AdminFooterComponent} from './components/admin-footer/admin-footer.component';
import {AdminHeaderComponent} from './components/admin-header/admin-header.component';
import {AdminSidebarComponent} from './components/admin-sidebar/admin-sidebar.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {KnbSidebarComponent} from './components/knb-sidebar/knb-sidebar.component';
import {KnbHeaderComponent} from './components/knb-header/knb-header.component';
import {MedHeaderComponent} from './components/med-header/med-header.component';
import {MedSidebarComponent} from './components/med-sidebar/med-sidebar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {ExecutorHeaderComponent} from "./components/executor-header/executor-header.component";
import {ExecutorSidebarComponent} from "./components/executor-sidebar/executor-sidebar.component";
import {ValueArrayPipe} from "./pipes/value-array.pipe";
import {AuthFilePipe} from './pipes/auth-file.pipe';
import {DirectorHeaderComponent} from './components/director-header/director-header.component';
import {DirectorSidebarComponent} from './components/director-sidebar/director-sidebar.component';
import {NgxPaginationModule} from "ngx-pagination";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {WebcamModule} from "ngx-webcam";
import {WebcamComponent} from './components/webcam/webcam.component';
import {ProfileFileModalComponent} from './components/profile-file-modal/profile-file-modal.component';
import {BrowserFileModalComponent} from './components/browser-file-modal/browser-file-modal.component';
import {NgxDocViewerModule} from "ngx-doc-viewer";
import {TranslateModule} from "@ngx-translate/core";
import { GlobalTranslatePipe } from './pipes/global-translate.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { StringToDatePipe } from './pipes/string-to-date.pipe';
import { SurveyReportComponent } from './components/survey-report/survey-report.component';
import {SignInComponent} from "./components/signin/signin.component";


@NgModule({
  declarations: [
    UserHeaderComponent,
    AuthHeaderComponent,
    AuthFooterComponent,
    CommonHeaderComponent,
    UserFooterComponent,
    CommonFooterComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    KnbSidebarComponent,
    KnbHeaderComponent,
    MedHeaderComponent,
    MedSidebarComponent,
    ExecutorHeaderComponent,
    ExecutorSidebarComponent,
    ValueArrayPipe,
    AuthFilePipe,
    DirectorHeaderComponent,
    DirectorSidebarComponent,
    WebcamComponent,
    ProfileFileModalComponent,
    BrowserFileModalComponent,
    GlobalTranslatePipe,
    TruncatePipe,
    StringToDatePipe,
    SurveyReportComponent,
    SignInComponent
  ],
    exports: [
        AuthHeaderComponent,
        AuthFooterComponent,
        CommonHeaderComponent,
        UserHeaderComponent,
        UserFooterComponent,
        CommonFooterComponent,
        AdminHeaderComponent,
        AdminSidebarComponent,
        KnbSidebarComponent,
        KnbHeaderComponent,
        MedSidebarComponent,
        MedHeaderComponent,
        ReactiveFormsModule,
        ExecutorHeaderComponent,
        ExecutorSidebarComponent,
        ValueArrayPipe,
        AuthFilePipe,
        DirectorHeaderComponent,
        DirectorSidebarComponent,
        WebcamComponent,
        ProfileFileModalComponent,
        BrowserFileModalComponent,
        GlobalTranslatePipe,
        TruncatePipe,
        StringToDatePipe,
        SurveyReportComponent,
        SignInComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    FormsModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    NgMultiSelectDropDownModule.forRoot(),
    WebcamModule,
    NgxDocViewerModule,
    TranslateModule
  ],
  providers: [TruncatePipe]
})


export class SharedModule { }
