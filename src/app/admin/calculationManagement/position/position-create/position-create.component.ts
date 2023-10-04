import { Component, OnInit } from '@angular/core';
import {JobCategory} from "../../../../shared/models/calculation/jobCategory";
import {SecretLevel} from "../../../../shared/models/calculation/secretLevel";
import {ArmyType} from "../../../../shared/models/system/armyType";
import {CategoryPosition} from "../../../../shared/models/calculation/categoryPosition";
import {PositionService} from "../../../../shared/services/position.service";
import {SecretLevelService} from "../../../../shared/services/secret-level.service";
import {ArmyTypeService} from "../../../../shared/services/army-type.service";
import {CategoryPositionService} from "../../../../shared/services/category-position.service";
import {JobCategoryService} from "../../../../shared/services/job-category.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Position} from "../../../../shared/models/calculation/position/position";
import {Toast, ToastrService} from "ngx-toastr";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";

@Component({
  selector: 'app-position-create',
  templateUrl: './position-create.component.html',
  styleUrls: ['./position-create.component.scss']
})
export class PositionCreateComponent implements OnInit {
  jobCategories:JobCategory[] = [];
  secretLevels:SecretLevel[] = [];
  armyType:ArmyType[] = [];
  categoryPosition:CategoryPosition[] = [];
  keyword:string = "titleRu";
  validationErrors:ValidationErrors = {status:false,messages:{}};
  //@ts-ignore
  fbGroup:FormGroup;

  constructor(
    private service:PositionService,private secretService:SecretLevelService,
    private armyTypeService:ArmyTypeService,private categoryPositionService:CategoryPositionService,
    private jobCategoryService:JobCategoryService,
    private toastr:ToastrService
  ) { }



  ngOnInit(): void {
    this.initializeSecretLevel();
    this.initializeArmyType();
    this.initializeCategoryPosition();
    this.initializeJobCategories();
    this.initializeForm();
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


  initializeForm(){
    this.fbGroup = new FormGroup({
      titleRu:new FormControl("",Validators.required),
      titleEn:new FormControl("",Validators.required),
      titleKz:new FormControl("",Validators.required),
      jobCategoryId:new FormControl("",[Validators.required,Validators.min(1)]),
      secretLevelId:new FormControl("",[Validators.required,Validators.min(1)]),
      armyTypeId:new FormControl("",[Validators.min(1)]),
      categoryPositionId:new FormControl("",[Validators.min(1)]),
    })
  }


  saveForm(){
    if(this.fbGroup.valid){
      this.service.Create(this.fbGroup.getRawValue() as Position).subscribe(
        response=>{
          this.toastr.success(response.message??"Успешно добавлено");
          this.clearForm();
        },
        error => {
          if(error.errors){
            this.validationErrors.messages = error.errors
            this.validationErrors.status = true
          }
        }
      )
    }
  }

  selectSecretLevelEvent(item: SecretLevel) {
    if(item){
      this.fbGroup.controls["secretLevelId"].setValue(item.id);
    }
  }

  isClosedSecretLevelAutoComplete() {
    this.fbGroup.controls["secretLevelId"].setValue(null);
  }

  selectArmyTypeEvent(item: ArmyType) {
    if(item){
      this.fbGroup.controls["armyTypeId"].setValue(item.id);
    }
  }

  isClosedArmyTypeAutoComplete() {
    this.fbGroup.controls["armyTypeId"].setValue(null);
  }

  selectCategoryPositionEvent(item: CategoryPosition) {
    if(item){
      this.fbGroup.controls["categoryPositionId"].setValue(item.id);
    }
  }

  isClosedCategoryPositionAutoComplete() {
    this.fbGroup.controls["categoryPositionId"].setValue(null);
  }

  selectJobCategoryEvent(item: JobCategory) {
    if(item){
      this.fbGroup.controls["jobCategoryId"].setValue(item.id);

    }
  }

  isClosedJobCategoryAutoComplete() {
    this.fbGroup.controls["jobCategoryId"].setValue(null);
  }


  clearForm(){
    this.fbGroup.reset();
  }

}
