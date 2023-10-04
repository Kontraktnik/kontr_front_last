import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import {SharedModule} from "../shared/shared.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { SystemHomeComponent } from './systemManagement/system-home/system-home.component';
import { CalulationHomeComponent } from './calculationManagement/calulation-home/calulation-home.component';
import { UserHomeComponent } from './userManagement/user-home/user-home.component';
import { AreaListComponent } from './systemManagement/areaManagement/area-list/area-list.component';
import { AreaSingleComponent } from './systemManagement/areaManagement/area-single/area-single.component';
import { AreaCreateComponent } from './systemManagement/areaManagement/area-create/area-create.component';
import { AreaUpdateComponent } from './systemManagement/areaManagement/area-update/area-update.component';
import { ArmyDepartmentListComponent } from './systemManagement/armyDepartmentManagement/army-department-list/army-department-list.component';
import { ArmyDepartmentCreateComponent } from './systemManagement/armyDepartmentManagement/army-department-create/army-department-create.component';
import { ArmyDepartmentUpdateComponent } from './systemManagement/armyDepartmentManagement/army-department-update/army-department-update.component';
import { ArmyDepartmentSingleComponent } from './systemManagement/armyDepartmentManagement/army-department-single/army-department-single.component';
import { ArmyRankListComponent } from './systemManagement/armyRankManagement/army-rank-list/army-rank-list.component';
import { ArmyRankSingleComponent } from './systemManagement/armyRankManagement/army-rank-single/army-rank-single.component';
import { ArmyRankCreateComponent } from './systemManagement/armyRankManagement/army-rank-create/army-rank-create.component';
import { ArmyRankUpdateComponent } from './systemManagement/armyRankManagement/army-rank-update/army-rank-update.component';
import { ArmyRegionListComponent } from './systemManagement/armyRegionManagement/army-region-list/army-region-list.component';
import { ArmyRegionCreateComponent } from './systemManagement/armyRegionManagement/army-region-create/army-region-create.component';
import { ArmyRegionSingleComponent } from './systemManagement/armyRegionManagement/army-region-single/army-region-single.component';
import { ArmyRegionUpdateComponent } from './systemManagement/armyRegionManagement/army-region-update/army-region-update.component';
import { ArmyTypeListComponent } from './systemManagement/armyTypeManagement/army-type-list/army-type-list.component';
import { ArmyTypeSingleComponent } from './systemManagement/armyTypeManagement/army-type-single/army-type-single.component';
import { ArmyTypeCreateComponent } from './systemManagement/armyTypeManagement/army-type-create/army-type-create.component';
import { ArmyTypeUpdateComponent } from './systemManagement/armyTypeManagement/army-type-update/army-type-update.component';
import { DriverLicenseListComponent } from './systemManagement/driverLicenseManagement/driver-license-list/driver-license-list.component';
import { DriverLicenseSingleComponent } from './systemManagement/driverLicenseManagement/driver-license-single/driver-license-single.component';
import { DriverLicenseCreateComponent } from './systemManagement/driverLicenseManagement/driver-license-create/driver-license-create.component';
import { DriverLicenseUpdateComponent } from './systemManagement/driverLicenseManagement/driver-license-update/driver-license-update.component';
import { EducationListComponent } from './systemManagement/educationManagement/education-list/education-list.component';
import { EducationSingleComponent } from './systemManagement/educationManagement/education-single/education-single.component';
import { EducationCreateComponent } from './systemManagement/educationManagement/education-create/education-create.component';
import { EducationUpdateComponent } from './systemManagement/educationManagement/education-update/education-update.component';
import { MedicalStatusUpdateComponent } from './systemManagement/medicalStatusManagement/medical-status-update/medical-status-update.component';
import { MedicalStatusCreateComponent } from './systemManagement/medicalStatusManagement/medical-status-create/medical-status-create.component';
import { MedicalStatusListComponent } from './systemManagement/medicalStatusManagement/medical-status-list/medical-status-list.component';
import { MedicalStatusSingleComponent } from './systemManagement/medicalStatusManagement/medical-status-single/medical-status-single.component';
import { RelativeSingleComponent } from './systemManagement/relativeManagement/relative-single/relative-single.component';
import { RelativeListComponent } from './systemManagement/relativeManagement/relative-list/relative-list.component';
import { RelativeCreateComponent } from './systemManagement/relativeManagement/relative-create/relative-create.component';
import { RelativeUpdateComponent } from './systemManagement/relativeManagement/relative-update/relative-update.component';
import { VtshUpdateComponent } from './systemManagement/vtshManagement/vtsh-update/vtsh-update.component';
import { VtshCreateComponent } from './systemManagement/vtshManagement/vtsh-create/vtsh-create.component';
import { VtshListComponent } from './systemManagement/vtshManagement/vtsh-list/vtsh-list.component';
import { VtshSingleComponent } from './systemManagement/vtshManagement/vtsh-single/vtsh-single.component';
import {NgxPaginationModule} from "ngx-pagination";
import { CategoryPositionListComponent } from './calculationManagement/categoryPosition/category-position-list/category-position-list.component';
import { CategoryPositionCreateComponent } from './calculationManagement/categoryPosition/category-position-create/category-position-create.component';
import { CategoryPositionSingleComponent } from './calculationManagement/categoryPosition/category-position-single/category-position-single.component';
import { CategoryPositionUpdateComponent } from './calculationManagement/categoryPosition/category-position-update/category-position-update.component';
import { JobCategoryListComponent } from './calculationManagement/jobCategory/job-category-list/job-category-list.component';
import { JobCategoryCreateComponent } from './calculationManagement/jobCategory/job-category-create/job-category-create.component';
import { JobCategoryUpdateComponent } from './calculationManagement/jobCategory/job-category-update/job-category-update.component';
import { JobCategorySingleComponent } from './calculationManagement/jobCategory/job-category-single/job-category-single.component';
import { QualificationSingleComponent } from './calculationManagement/qualification/qualification-single/qualification-single.component';
import { QualificationListComponent } from './calculationManagement/qualification/qualification-list/qualification-list.component';
import { QualificationCreateComponent } from './calculationManagement/qualification/qualification-create/qualification-create.component';
import { QualificationUpdateComponent } from './calculationManagement/qualification/qualification-update/qualification-update.component';
import { SecretLevelListComponent } from './calculationManagement/secretLevel/secret-level-list/secret-level-list.component';
import { SecretLevelCreateComponent } from './calculationManagement/secretLevel/secret-level-create/secret-level-create.component';
import { SecretLevelUpdateComponent } from './calculationManagement/secretLevel/secret-level-update/secret-level-update.component';
import { SecretLevelSingleComponent } from './calculationManagement/secretLevel/secret-level-single/secret-level-single.component';
import { RankSalaryListComponent } from './calculationManagement/rankSalary/rank-salary-list/rank-salary-list.component';
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import { RankSalaryCreateComponent } from './calculationManagement/rankSalary/rank-salary-create/rank-salary-create.component';
import { RankSalaryUpdateComponent } from './calculationManagement/rankSalary/rank-salary-update/rank-salary-update.component';
import { RankSalarySingleComponent } from './calculationManagement/rankSalary/rank-salary-single/rank-salary-single.component';
import { ServiceYearListComponent } from './calculationManagement/serviceYear/service-year-list/service-year-list.component';
import { ServiceYearCreateComponent } from './calculationManagement/serviceYear/service-year-create/service-year-create.component';
import { ServiceYearUpdateComponent } from './calculationManagement/serviceYear/service-year-update/service-year-update.component';
import { ServiceYearSingleComponent } from './calculationManagement/serviceYear/service-year-single/service-year-single.component';
import { JobYearListComponent } from './calculationManagement/jobYear/job-year-list/job-year-list.component';
import { JobYearCreateComponent } from './calculationManagement/jobYear/job-year-create/job-year-create.component';
import { JobYearUpdateComponent } from './calculationManagement/jobYear/job-year-update/job-year-update.component';
import { JobYearSingleComponent } from './calculationManagement/jobYear/job-year-single/job-year-single.component';
import { PositionListComponent } from './calculationManagement/position/position-list/position-list.component';
import {FormsModule} from "@angular/forms";
import { PositionCreateComponent } from './calculationManagement/position/position-create/position-create.component';
import { PositionUpdateComponent } from './calculationManagement/position/position-update/position-update.component';
import { PositionSingleComponent } from './calculationManagement/position/position-single/position-single.component';
import { RoleListComponent } from './userManagement/roleManagement/role-list/role-list.component';
import { UserListComponent } from './userManagement/user/user-list/user-list.component';
import { UserCreateComponent } from './userManagement/user/user-create/user-create.component';
import {IMaskModule} from "angular-imask";
import { UserUpdateComponent } from './userManagement/user/user-update/user-update.component';
import { UserSingleComponent } from './userManagement/user/user-single/user-single.component';
import { ListBackupsComponent } from './backupManagement/list-backups/list-backups.component';
import { CreateBackupsComponent } from './backupManagement/create-backups/create-backups.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    SystemHomeComponent,
    CalulationHomeComponent,
    UserHomeComponent,
    AreaListComponent,
    AreaSingleComponent,
    AreaCreateComponent,
    AreaUpdateComponent,
    ArmyDepartmentListComponent,
    ArmyDepartmentCreateComponent,
    ArmyDepartmentUpdateComponent,
    ArmyDepartmentSingleComponent,
    ArmyRankListComponent,
    ArmyRankSingleComponent,
    ArmyRankCreateComponent,
    ArmyRankUpdateComponent,
    ArmyRegionListComponent,
    ArmyRegionCreateComponent,
    ArmyRegionSingleComponent,
    ArmyRegionUpdateComponent,
    ArmyTypeListComponent,
    ArmyTypeSingleComponent,
    ArmyTypeCreateComponent,
    ArmyTypeUpdateComponent,
    DriverLicenseListComponent,
    DriverLicenseSingleComponent,
    DriverLicenseCreateComponent,
    DriverLicenseUpdateComponent,
    EducationListComponent,
    EducationSingleComponent,
    EducationCreateComponent,
    EducationUpdateComponent,
    MedicalStatusUpdateComponent,
    MedicalStatusCreateComponent,
    MedicalStatusListComponent,
    MedicalStatusSingleComponent,
    RelativeSingleComponent,
    RelativeListComponent,
    RelativeCreateComponent,
    RelativeUpdateComponent,
    VtshUpdateComponent,
    VtshCreateComponent,
    VtshListComponent,
    VtshSingleComponent,
    CategoryPositionListComponent,
    CategoryPositionCreateComponent,
    CategoryPositionSingleComponent,
    CategoryPositionUpdateComponent,
    JobCategoryListComponent,
    JobCategoryCreateComponent,
    JobCategoryUpdateComponent,
    JobCategorySingleComponent,
    QualificationSingleComponent,
    QualificationListComponent,
    QualificationCreateComponent,
    QualificationUpdateComponent,
    SecretLevelListComponent,
    SecretLevelCreateComponent,
    SecretLevelUpdateComponent,
    SecretLevelSingleComponent,
    RankSalaryListComponent,
    RankSalaryCreateComponent,
    RankSalaryUpdateComponent,
    RankSalarySingleComponent,
    ServiceYearListComponent,
    ServiceYearCreateComponent,
    ServiceYearUpdateComponent,
    ServiceYearSingleComponent,
    JobYearListComponent,
    JobYearCreateComponent,
    JobYearUpdateComponent,
    JobYearSingleComponent,
    PositionListComponent,
    PositionCreateComponent,
    PositionUpdateComponent,
    PositionSingleComponent,
    RoleListComponent,
    UserListComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserSingleComponent,
    ListBackupsComponent,
    CreateBackupsComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    SharedModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    FormsModule,
    IMaskModule,
  ]
})
export class AdminModule { }
