import { Component, OnInit } from '@angular/core';
import {JobCategory} from "../../../../shared/models/calculation/jobCategory";
import {PositionParameters} from "../../../../shared/parameters/positionParameters";
import {SecretLevel} from "../../../../shared/models/calculation/secretLevel";
import {ArmyType} from "../../../../shared/models/system/armyType";
import {CategoryPosition} from "../../../../shared/models/calculation/categoryPosition";
import {IPagination} from "../../../../shared/helpers/pagination";
import {Position} from "../../../../shared/models/calculation/position/position";
import {PositionService} from "../../../../shared/services/position.service";
import {SecretLevelService} from "../../../../shared/services/secret-level.service";
import {ArmyTypeService} from "../../../../shared/services/army-type.service";
import {CategoryPositionService} from "../../../../shared/services/category-position.service";
import {JobCategoryService} from "../../../../shared/services/job-category.service";
import {RankSalary} from "../../../../shared/models/calculation/rankSalary/rankSalary";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent implements OnInit {
  jobCategories:JobCategory[] = [];
  secretLevels:SecretLevel[] = [];
  armyType:ArmyType[] = [];
  categoryPosition:CategoryPosition[] = [];
  perPage:number[] = [5,10,20,50,100];
  keyword:string = "titleRu";
  //@ts-ignore
  position:IPagination<Position>;
  parameter:PositionParameters = new PositionParameters();

  constructor(
    private service:PositionService,private secretService:SecretLevelService,
    private armyTypeService:ArmyTypeService,private categoryPositionService:CategoryPositionService,
    private jobCategoryService:JobCategoryService,private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeSecretLevel();
    this.initializeArmyType();
    this.initializeCategoryPosition();
    this.initializeJobCategories();
    this.initializeData();
  }

  initializeSecretLevel(){
    this.secretService.getAll(true).subscribe(
      response=>{
        this.secretLevels = response.data
      }
    )
  }

  initializeArmyType(){
    this.armyTypeService.getAll(true).subscribe(
      response=>{
        this.armyType = response.data
      }
    )
  }

  initializeCategoryPosition(){
    this.categoryPositionService.getAll(true).subscribe(
      response=>{
        this.categoryPosition = response.data
      }
    )
  }

  initializeJobCategories(){
    this.jobCategoryService.getAll(true).subscribe(
      response=>{
        this.jobCategories = response.data
      }
    )
  }

  initializeData(){
    this.service.getAllWithParam(this.parameter).subscribe(
      response=>{
        //@ts-ignore
        this.position = response
      }
    )
  }

  changePageSize(perPage:any){
    perPage = perPage.value;
    if(perPage != null && perPage > 0){
      this.parameter.pageIndex = 1;
      this.parameter.pageSize = perPage;
      this.initializeData();
    }
  }

  onPagerChange(event: any) {
    this.parameter.pageIndex = event;
    this.initializeData();
  }

  selectSecretLevelEvent(item: SecretLevel) {
    if(item){
      this.parameter.pageIndex = 1;
      this.parameter.secretId = item.id;
      this.initializeData();
    }
  }

  isClosedSecretLevelAutoComplete() {
    this.parameter.pageIndex = 1;
    this.parameter.secretId = null;
    this.initializeData();
  }

  selectArmyTypeEvent(item: ArmyType) {
    if(item){
      this.parameter.pageIndex = 1;
      this.parameter.armyTypeId = item.id;
      this.initializeData();
    }
  }

  isClosedArmyTypeAutoComplete() {
    this.parameter.pageIndex = 1;
    this.parameter.armyTypeId = null;
    this.initializeData();
  }

  selectCategoryPositionEvent(item: CategoryPosition) {
    if(item){
      this.parameter.pageIndex = 1;
      this.parameter.categoryPositionId = item.id;
      this.initializeData();
    }
  }

  isClosedCategoryPositionAutoComplete() {
    this.parameter.pageIndex = 1;
    this.parameter.categoryPositionId = null;
    this.initializeData();
  }

  selectJobCategoryEvent(item: JobCategory) {
    if(item){
      this.parameter.pageIndex = 1;
      this.parameter.jobCategoryId = item.id;
      this.initializeData();
    }
  }

  isClosedJobCategoryAutoComplete() {
    this.parameter.pageIndex = 1;
    this.parameter.jobCategoryId = null;
    this.initializeData();
  }

  onSearch(){
    if(this.parameter.search != null && this.parameter.search?.length> 3){
      this.parameter.pageIndex = 1;
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
