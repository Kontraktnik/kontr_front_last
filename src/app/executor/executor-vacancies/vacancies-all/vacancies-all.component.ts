import { Component, OnInit } from '@angular/core';
import { faPencilAlt,faTimesCircle,faPlus,faBars,faList,faTh  } from '@fortawesome/free-solid-svg-icons';
import {IPagination} from "../../../shared/helpers/pagination";
import {Vacancy} from "../../../shared/models/vacancy/vacancy";
import {ExecutorVacancyService} from "../../executor-vacancy.service";
import {VacancyParameters} from "../../../shared/parameters/vacancyParameters";
import {Position} from "../../../shared/models/calculation/position/position";
import {JobCategory} from "../../../shared/models/calculation/jobCategory";
import {ArmyType} from "../../../shared/models/system/armyType";
import {ArmyRegion} from "../../../shared/models/system/armyRegion";
import {SecretLevel} from "../../../shared/models/calculation/secretLevel";
import {Qualification} from "../../../shared/models/calculation/qualification";
import {JobCategoryService} from "../../../shared/services/job-category.service";
import {ArmyTypeService} from "../../../shared/services/army-type.service";
import {ArmyRegionService} from "../../../shared/services/army-region.service";
import {QualificationService} from "../../../shared/services/qualification.service";
import {PositionService} from "../../../shared/services/position.service";
import {SecretLevelService} from "../../../shared/services/secret-level.service";
import {VacancyExecutorParameters} from "../../../shared/parameters/vacancyExecutorParameters";
import {Role} from "../../../shared/models/user/role";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-vacancies-all',
  templateUrl: './vacancies-all.component.html',
  styleUrls: ['./vacancies-all.component.scss']
})
export class VacanciesAllComponent implements OnInit {

  faPencilAlt = faPencilAlt;
  faTimesCircle =faTimesCircle;
  faPlus = faPlus;
  faBars = faBars;
  faList = faList;
  faTh = faTh;
  //Search
  position:Position[] = [];
  jobCategory:JobCategory[] = [];
  armyType:ArmyType[] = [];
  armyRegion: ArmyRegion[] = [];
  secretLevel:SecretLevel[] = [];
  qualification:Qualification[] = [];
  keyword:string = "titleRu";
  showType = "list";
  perPage:number[] = [1,5,10,20,50,100];
  //@ts-ignore
  data:IPagination<Vacancy>;
  parameters:VacancyExecutorParameters = new VacancyExecutorParameters();

  constructor(
    private service:ExecutorVacancyService,
    private positionService:PositionService,
    private jobCategoryService:JobCategoryService,
    private armyTypeService:ArmyTypeService,
    private armyRegionService:ArmyRegionService,
    private qualificationService:QualificationService,
    private secretLevelService:SecretLevelService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeData();
    this.initializeOtherData();
  }
  changeShow(typeShow:string){
    this.showType = typeShow;
  }


  initializeData(){
    this.service.getAllWithParam(this.parameters).subscribe(
      response=>{
        //@ts-ignore
        this.data = response;
      }
    )
  }


  initializeOtherData(){
    //Position
    this.positionService.getAll(true).subscribe(
      response=>{
        this.position = response.data;
      }
    )
    //JobCategory
    this.jobCategoryService.getAll(true).subscribe(
      response=>{
        this.jobCategory = response.data;
      }
    );
    //ArmyType
    this.armyTypeService.getAll(true).subscribe(
      response=>{
        this.armyType = response.data;
      }
    );
    //ArmyRegion
    this.armyRegionService.getAll(true).subscribe(
      response=>{
        this.armyRegion = response.data;
      }
    );
    //Secret Level
    this.secretLevelService.getAll(true).subscribe(
      response=>{
        this.secretLevel = response.data;
      }
    );
    //Qualification
    this.qualificationService.getAll(true).subscribe(
      response=>{
        this.qualification = response.data;
      }
    );

  }


  selectPositionEvent(item: Position) {
    if(item){
      this.parameters.pageIndex = 1;
      this.parameters.positionId = item.id;
      this.initializeData();
    }
  }
  isClosedPositionAutoComplete() {
    this.parameters.pageIndex = 1;
    this.parameters.positionId = null;
    this.initializeData();
  }

  selectJobCategoryEvent(item: JobCategory) {
    if(item){
      this.parameters.pageIndex = 1;
      this.parameters.jobCategoryId = item.id;
      this.initializeData();
    }
  }
  isClosedJobCategoryAutoComplete() {
    this.parameters.pageIndex = 1;
    this.parameters.jobCategoryId = null;
    this.initializeData();
  }

  selectArmyTypeEvent(item: ArmyType) {
    if(item){
      this.parameters.pageIndex = 1;
      this.parameters.armyTypeId = item.id;
      this.initializeData();
    }
  }
  isClosedArmyTypeAutoComplete() {
    this.parameters.pageIndex = 1;
    this.parameters.armyTypeId = null;
    this.initializeData();
  }

  selectArmyRegionEvent(item: ArmyRegion) {
    if(item){
      this.parameters.pageIndex = 1;
      this.parameters.armyRegionId = item.id;
      this.initializeData();
    }
  }
  isClosedArmyRegionAutoComplete() {
    this.parameters.pageIndex = 1;
    this.parameters.armyRegionId = null;
    this.initializeData();
  }

  selectQualificationEvent(item: Qualification) {
    if(item){
      this.parameters.pageIndex = 1;
      this.parameters.qualificationId = item.id;
      this.initializeData();
    }
  }
  isClosedQualificationAutoComplete() {
    this.parameters.pageIndex = 1;
    this.parameters.qualificationId = null;
    this.initializeData();
  }

  selectSecretLevelEvent(item: SecretLevel) {
    if(item){
      this.parameters.pageIndex = 1;
      this.parameters.secretLevelId = item.id;
      this.initializeData();
    }
  }
  isClosedSecretLevelAutoComplete() {
    this.parameters.pageIndex = 1;
    this.parameters.secretLevelId = null;
    this.initializeData();
  }






  changePageSize(perPage:any){
    perPage = perPage.value;
    if(perPage != null && perPage > 0){
      this.parameters.pageIndex = 1;
      this.parameters.pageSize = perPage;
      this.initializeData();
    }
  }

  onPagerChange(event: any) {
    this.parameters.pageIndex = event;
    this.initializeData();
  }

  onSearch(){
    if(this.parameters.search != null && this.parameters.search?.length> 3){
      this.parameters.pageIndex = 1;
      this.initializeData();
    }
    else{
      this.initializeData();
    }
  }

  delete(id:number){
    this.service.Delete(id).subscribe(
      response=>{
        this.toastr.success(response.message);
        this.initializeData();
      },
      error => {
        if(error.message){
          this.toastr.error(error.message);
        }
      }
    )
  }



}
