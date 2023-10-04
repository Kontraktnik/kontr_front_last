import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {SystemHomeComponent} from "./systemManagement/system-home/system-home.component";
import {CalulationHomeComponent} from "./calculationManagement/calulation-home/calulation-home.component";
import {AreaListComponent} from "./systemManagement/areaManagement/area-list/area-list.component";
import {AreaCreateComponent} from "./systemManagement/areaManagement/area-create/area-create.component";
import {AreaSingleComponent} from "./systemManagement/areaManagement/area-single/area-single.component";
import {AreaUpdateComponent} from "./systemManagement/areaManagement/area-update/area-update.component";
import {
  ArmyDepartmentListComponent
} from "./systemManagement/armyDepartmentManagement/army-department-list/army-department-list.component";
import {
  ArmyRegionListComponent
} from "./systemManagement/armyRegionManagement/army-region-list/army-region-list.component";
import {ArmyRankListComponent} from "./systemManagement/armyRankManagement/army-rank-list/army-rank-list.component";
import {ArmyTypeListComponent} from "./systemManagement/armyTypeManagement/army-type-list/army-type-list.component";
import {
  DriverLicenseListComponent
} from "./systemManagement/driverLicenseManagement/driver-license-list/driver-license-list.component";
import {EducationListComponent} from "./systemManagement/educationManagement/education-list/education-list.component";
import {
  MedicalStatusListComponent
} from "./systemManagement/medicalStatusManagement/medical-status-list/medical-status-list.component";
import {RelativeListComponent} from "./systemManagement/relativeManagement/relative-list/relative-list.component";
import {VtshListComponent} from "./systemManagement/vtshManagement/vtsh-list/vtsh-list.component";
import {
  ArmyDepartmentSingleComponent
} from "./systemManagement/armyDepartmentManagement/army-department-single/army-department-single.component";
import {
  ArmyDepartmentCreateComponent
} from "./systemManagement/armyDepartmentManagement/army-department-create/army-department-create.component";
import {
  ArmyDepartmentUpdateComponent
} from "./systemManagement/armyDepartmentManagement/army-department-update/army-department-update.component";
import {
  ArmyRankSingleComponent
} from "./systemManagement/armyRankManagement/army-rank-single/army-rank-single.component";
import {
  ArmyRankUpdateComponent
} from "./systemManagement/armyRankManagement/army-rank-update/army-rank-update.component";
import {
  ArmyRankCreateComponent
} from "./systemManagement/armyRankManagement/army-rank-create/army-rank-create.component";
import {
  ArmyRegionCreateComponent
} from "./systemManagement/armyRegionManagement/army-region-create/army-region-create.component";
import {
  ArmyRegionSingleComponent
} from "./systemManagement/armyRegionManagement/army-region-single/army-region-single.component";
import {
  ArmyRegionUpdateComponent
} from "./systemManagement/armyRegionManagement/army-region-update/army-region-update.component";
import {
  ArmyTypeSingleComponent
} from "./systemManagement/armyTypeManagement/army-type-single/army-type-single.component";
import {
  ArmyTypeCreateComponent
} from "./systemManagement/armyTypeManagement/army-type-create/army-type-create.component";
import {
  ArmyTypeUpdateComponent
} from "./systemManagement/armyTypeManagement/army-type-update/army-type-update.component";
import {
  DriverLicenseSingleComponent
} from "./systemManagement/driverLicenseManagement/driver-license-single/driver-license-single.component";
import {
  DriverLicenseCreateComponent
} from "./systemManagement/driverLicenseManagement/driver-license-create/driver-license-create.component";
import {
  DriverLicenseUpdateComponent
} from "./systemManagement/driverLicenseManagement/driver-license-update/driver-license-update.component";
import {
  EducationSingleComponent
} from "./systemManagement/educationManagement/education-single/education-single.component";
import {
  EducationUpdateComponent
} from "./systemManagement/educationManagement/education-update/education-update.component";
import {
  EducationCreateComponent
} from "./systemManagement/educationManagement/education-create/education-create.component";
import {
  MedicalStatusSingleComponent
} from "./systemManagement/medicalStatusManagement/medical-status-single/medical-status-single.component";
import {
  MedicalStatusCreateComponent
} from "./systemManagement/medicalStatusManagement/medical-status-create/medical-status-create.component";
import {
  MedicalStatusUpdateComponent
} from "./systemManagement/medicalStatusManagement/medical-status-update/medical-status-update.component";
import {RelativeSingleComponent} from "./systemManagement/relativeManagement/relative-single/relative-single.component";
import {RelativeCreateComponent} from "./systemManagement/relativeManagement/relative-create/relative-create.component";
import {RelativeUpdateComponent} from "./systemManagement/relativeManagement/relative-update/relative-update.component";
import {VtshCreateComponent} from "./systemManagement/vtshManagement/vtsh-create/vtsh-create.component";
import {VtshSingleComponent} from "./systemManagement/vtshManagement/vtsh-single/vtsh-single.component";
import {VtshUpdateComponent} from "./systemManagement/vtshManagement/vtsh-update/vtsh-update.component";
import {
  CategoryPositionListComponent
} from "./calculationManagement/categoryPosition/category-position-list/category-position-list.component";
import {
  CategoryPositionCreateComponent
} from "./calculationManagement/categoryPosition/category-position-create/category-position-create.component";
import {
  CategoryPositionSingleComponent
} from "./calculationManagement/categoryPosition/category-position-single/category-position-single.component";
import {
  CategoryPositionUpdateComponent
} from "./calculationManagement/categoryPosition/category-position-update/category-position-update.component";
import {
  JobCategoryListComponent
} from "./calculationManagement/jobCategory/job-category-list/job-category-list.component";
import {
  JobCategorySingleComponent
} from "./calculationManagement/jobCategory/job-category-single/job-category-single.component";
import {
  JobCategoryUpdateComponent
} from "./calculationManagement/jobCategory/job-category-update/job-category-update.component";
import {
  JobCategoryCreateComponent
} from "./calculationManagement/jobCategory/job-category-create/job-category-create.component";
import {
  QualificationListComponent
} from "./calculationManagement/qualification/qualification-list/qualification-list.component";
import {
  QualificationCreateComponent
} from "./calculationManagement/qualification/qualification-create/qualification-create.component";
import {
  QualificationSingleComponent
} from "./calculationManagement/qualification/qualification-single/qualification-single.component";
import {
  QualificationUpdateComponent
} from "./calculationManagement/qualification/qualification-update/qualification-update.component";
import {
  SecretLevelListComponent
} from "./calculationManagement/secretLevel/secret-level-list/secret-level-list.component";
import {
  SecretLevelCreateComponent
} from "./calculationManagement/secretLevel/secret-level-create/secret-level-create.component";
import {
  SecretLevelSingleComponent
} from "./calculationManagement/secretLevel/secret-level-single/secret-level-single.component";
import {
  SecretLevelUpdateComponent
} from "./calculationManagement/secretLevel/secret-level-update/secret-level-update.component";
import {RankSalaryListComponent} from "./calculationManagement/rankSalary/rank-salary-list/rank-salary-list.component";
import {
  RankSalaryCreateComponent
} from "./calculationManagement/rankSalary/rank-salary-create/rank-salary-create.component";
import {
  RankSalaryUpdateComponent
} from "./calculationManagement/rankSalary/rank-salary-update/rank-salary-update.component";
import {
  RankSalarySingleComponent
} from "./calculationManagement/rankSalary/rank-salary-single/rank-salary-single.component";
import {
  ServiceYearListComponent
} from "./calculationManagement/serviceYear/service-year-list/service-year-list.component";
import {
  ServiceYearCreateComponent
} from "./calculationManagement/serviceYear/service-year-create/service-year-create.component";
import {
  ServiceYearUpdateComponent
} from "./calculationManagement/serviceYear/service-year-update/service-year-update.component";
import {
  ServiceYearSingleComponent
} from "./calculationManagement/serviceYear/service-year-single/service-year-single.component";
import {JobYearListComponent} from "./calculationManagement/jobYear/job-year-list/job-year-list.component";
import {JobYearCreateComponent} from "./calculationManagement/jobYear/job-year-create/job-year-create.component";
import {JobYearUpdateComponent} from "./calculationManagement/jobYear/job-year-update/job-year-update.component";
import {JobYearSingleComponent} from "./calculationManagement/jobYear/job-year-single/job-year-single.component";
import {PositionListComponent} from "./calculationManagement/position/position-list/position-list.component";
import {PositionCreateComponent} from "./calculationManagement/position/position-create/position-create.component";
import {PositionUpdateComponent} from "./calculationManagement/position/position-update/position-update.component";
import {PositionSingleComponent} from "./calculationManagement/position/position-single/position-single.component";
import {UserHomeComponent} from "./userManagement/user-home/user-home.component";
import {RoleListComponent} from "./userManagement/roleManagement/role-list/role-list.component";
import {UserListComponent} from "./userManagement/user/user-list/user-list.component";
import {UserCreateComponent} from "./userManagement/user/user-create/user-create.component";
import {UserUpdateComponent} from "./userManagement/user/user-update/user-update.component";
import {UserSingleComponent} from "./userManagement/user/user-single/user-single.component";
import {ListBackupsComponent} from "./backupManagement/list-backups/list-backups.component";
import {CreateBackupsComponent} from "./backupManagement/create-backups/create-backups.component";


const routes: Routes = [
  {
    path:"admin",
    component:AdminLayoutComponent,
    children:[
      {
        path:"",
        component:SystemHomeComponent
      },
      {
        path:"system-data",
        component:SystemHomeComponent
      },
      {
        path:"calculation-data",
        component:CalulationHomeComponent
      },
      //System Data Management
      //Area
      {
        path:"area-management",
        component:AreaListComponent
      },
      {
        path:"area-single-management/:id",
        component:AreaSingleComponent
      },
      {
        path:"area-management-create",
        component:AreaCreateComponent
      },
      {
        path:"area-management-update/:id",
        component:AreaUpdateComponent
      },
      //ArmyDepartment
      {
        path:"army-department-list",
        component:ArmyDepartmentListComponent
      },
      {
        path:"army-department-single-management/:id",
        component:ArmyDepartmentSingleComponent
      },
      {
        path:"army-department-create-management",
        component:ArmyDepartmentCreateComponent
      },
      {
        path:"army-department-update-management/:id",
        component:ArmyDepartmentUpdateComponent
      },
      //Region
      //ArmyDepartment
      {
        path:"army-rank-list",
        component:ArmyRankListComponent
      },
      {
        path:"army-rank-single/:id",
        component:ArmyRankSingleComponent
      },
      {
        path:"army-rank-create",
        component:ArmyRankCreateComponent
      },
      {
        path:"army-rank-update/:id",
        component:ArmyRankUpdateComponent
      },
      //ArmyRegion
      {
        path:"army-region-list",
        component:ArmyRegionListComponent
      },
      {
        path:"army-region-single/:id",
        component:ArmyRegionSingleComponent
      },
      {
        path:"army-region-create",
        component:ArmyRegionCreateComponent
      },
      {
        path:"army-region-update/:id",
        component:ArmyRegionUpdateComponent
      },
      //Army Type
      {
        path:"army-type-list",
        component:ArmyTypeListComponent
      },
      {
        path:"army-type-single/:id",
        component:ArmyTypeSingleComponent
      },
      {
        path:"army-type-create",
        component:ArmyTypeCreateComponent
      },
      {
        path:"army-type-update/:id",
        component:ArmyTypeUpdateComponent
      },
      //DriverLicense
      {
        path:"driver-license-list",
        component:DriverLicenseListComponent
      },
      {
        path:"driver-license-single/:id",
        component:DriverLicenseSingleComponent
      },
      {
        path:"driver-license-create",
        component:DriverLicenseCreateComponent
      },
      {
        path:"driver-license-update/:id",
        component:DriverLicenseUpdateComponent
      },
      //Education
      {
        path:"education-list",
        component:EducationListComponent
      },
      {
        path:"education-single/:id",
        component:EducationSingleComponent
      },
      {
        path:"education-create",
        component:EducationCreateComponent
      },
      {
        path:"education-update/:id",
        component:EducationUpdateComponent
      },
      //Medical Status
      {
        path:"medical-status-list",
        component:MedicalStatusListComponent
      },
      {
        path:"medical-status-single/:id",
        component:MedicalStatusSingleComponent
      },
      {
        path:"medical-status-create",
        component:MedicalStatusCreateComponent
      },
      {
        path:"medical-status-update/:id",
        component:MedicalStatusUpdateComponent
      },
      //Relative Status
      {
        path:"relative-list",
        component:RelativeListComponent
      },
      {
        path:"relative-single/:id",
        component:RelativeSingleComponent
      },
      {
        path:"relative-create",
        component:RelativeCreateComponent
      },
      {
        path:"relative-update/:id",
        component:RelativeUpdateComponent
      },
      //VTSH Status
      {
        path:"vtsh-list",
        component:VtshListComponent
      },
      {
        path:"vtsh-single/:id",
        component:VtshSingleComponent
      },
      {
        path:"vtsh-create",
        component:VtshCreateComponent
      },
      {
        path:"vtsh-update/:id",
        component:VtshUpdateComponent
      },


      //Calculation Model
      //Category Position
      {
        path:"category-position-list",
        component:CategoryPositionListComponent
      },
      {
        path:"category-position-single/:id",
        component:CategoryPositionSingleComponent
      },
      {
        path:"category-position-create",
        component:CategoryPositionCreateComponent
      },
      {
        path:"category-position-update/:id",
        component:CategoryPositionUpdateComponent
      },
      //Job Category
      {
        path:"job-category-list",
        component:JobCategoryListComponent
      },
      {
        path:"job-category-create",
        component:JobCategoryCreateComponent
      },
      {
        path:"job-category-single/:id",
        component:JobCategorySingleComponent
      },
      {
        path:"job-category-update/:id",
        component:JobCategoryUpdateComponent
      },
      //Qualifications
      {
        path:"qualification-list",
        component:QualificationListComponent
      },
      {
        path:"qualification-create",
        component:QualificationCreateComponent
      },
      {
        path:"qualification-single/:id",
        component:QualificationSingleComponent
      },
      {
        path:"qualification-update/:id",
        component:QualificationUpdateComponent
      },
      //Secret Level
      {
        path:"secret-level-list",
        component:SecretLevelListComponent
      },
      {
        path:"secret-level-create",
        component:SecretLevelCreateComponent
      },
      {
        path:"secret-level-single/:id",
        component:SecretLevelSingleComponent
      },
      {
        path:"secret-level-update/:id",
        component:SecretLevelUpdateComponent
      },
      //RankSalary
      {
        path:"rank-salary-list",
        component:RankSalaryListComponent
      },
      {
        path:"rank-salary-single/:id",
        component:RankSalarySingleComponent
      },
      {
        path:"rank-salary-create",
        component:RankSalaryCreateComponent
      },
      {
        path:"rank-salary-update/:id",
        component:RankSalaryUpdateComponent
      },
      //Service Year
      {
        path:"service-year-list",
        component:ServiceYearListComponent
      },
      {
        path:"service-year-single/:id",
        component:ServiceYearSingleComponent
      },
      {
        path:"service-year-create",
        component:ServiceYearCreateComponent
      },
      {
        path:"service-year-update/:id",
        component:ServiceYearUpdateComponent
      },
      //Job Year
      {
        path:"job-year-list",
        component:JobYearListComponent
      },
      {
        path:"job-year-single/:id",
        component:JobYearSingleComponent
      },
      {
        path:"job-year-create",
        component:JobYearCreateComponent
      },
      {
        path:"job-year-update/:id",
        component:JobYearUpdateComponent
      },
      //Position
      {
        path:"position-list",
        component:PositionListComponent
      },
      {
        path:"position-single/:id",
        component:PositionSingleComponent
      },
      {
        path:"position-create",
        component:PositionCreateComponent
      },
      {
        path:"position-update/:id",
        component:PositionUpdateComponent
      },
      //User Management
      {
        path:"user-management",
        component:UserHomeComponent
      },
      //Role
      {
        path:"role-list",
        component:RoleListComponent
      },
      //Users
      {
        path:"user-list",
        component:UserListComponent
      },
      {
        path:"user-single/:iin",
        component:UserSingleComponent
      },
      {
        path:"user-create",
        component:UserCreateComponent
      },
      {
        path:"user-update/:iin",
        component:UserUpdateComponent
      },
      //DB Indexes
      {
        path:"backups",
        component:ListBackupsComponent
      },
      {
        path:"create-backup",
        component:CreateBackupsComponent
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
