import { Component, OnInit } from '@angular/core';
import {JobCategory} from "../../../../shared/models/calculation/jobCategory";
import {SecretLevel} from "../../../../shared/models/calculation/secretLevel";
import {ArmyType} from "../../../../shared/models/system/armyType";
import {CategoryPosition} from "../../../../shared/models/calculation/categoryPosition";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PositionService} from "../../../../shared/services/position.service";
import {SecretLevelService} from "../../../../shared/services/secret-level.service";
import {ArmyTypeService} from "../../../../shared/services/army-type.service";
import {CategoryPositionService} from "../../../../shared/services/category-position.service";
import {JobCategoryService} from "../../../../shared/services/job-category.service";
import {ToastrService} from "ngx-toastr";
import {Position} from "../../../../shared/models/calculation/position/position";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-position-update',
  templateUrl: './position-update.component.html',
  styleUrls: ['./position-update.component.scss']
})
export class PositionUpdateComponent implements OnInit {
  //@ts-ignore
  data:Position;
  jobCategories:JobCategory[] = [];
  secretLevels:SecretLevel[] = [];
  armyType:ArmyType[] = [];
  categoryPosition:CategoryPosition[] = [];
  keyword:string = "titleRu";
  validationErrors:ValidationErrors = {status:false,messages:{}};
  //@ts-ignore
  fbGroup:FormGroup;
  //@ts-ignore
  id:number;

  constructor(
    private service:PositionService,private secretService:SecretLevelService,
    private armyTypeService:ArmyTypeService,private categoryPositionService:CategoryPositionService,
    private jobCategoryService:JobCategoryService,
    private toastr:ToastrService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(res => {this.id=res.id});
  }



  ngOnInit(): void {
    this.initializeData();
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


  initializeData(){
    this.service.getById(this.id).subscribe(
      response=>{
        this.data = response.data;
        this.setForm();
      },
      error => {

      }
    );
  }


  initializeForm(){
    this.fbGroup = new FormGroup({
      id:new FormControl("",Validators.required),
      titleRu:new FormControl("",Validators.required),
      titleEn:new FormControl("",Validators.required),
      titleKz:new FormControl("",Validators.required),
      jobCategoryId:new FormControl("",[Validators.required,Validators.min(1)]),
      secretLevelId:new FormControl("",[Validators.required,Validators.min(1)]),
      armyTypeId:new FormControl("",[Validators.min(1)]),
      categoryPositionId:new FormControl("",[Validators.min(1)]),
    })
  }

  setForm(){
    if(this.data){
      this.fbGroup.controls["id"].setValue(this.data.id);
      this.fbGroup.controls["titleRu"].setValue(this.data.titleRu);
      this.fbGroup.controls["titleEn"].setValue(this.data.titleEn);
      this.fbGroup.controls["titleKz"].setValue(this.data.titleKz);
      this.fbGroup.controls["jobCategoryId"].setValue(this.data.jobCategoryId);
      this.fbGroup.controls["secretLevelId"].setValue(this.data.secretLevelId);
      this.fbGroup.controls["armyTypeId"].setValue(this.data.armyTypeId);
      this.fbGroup.controls["categoryPositionId"].setValue(this.data.categoryPositionId);
    }
  }


  saveForm(){
    if(this.fbGroup.valid){
      this.service.Update(this.id,this.fbGroup.getRawValue() as Position).subscribe(
        response=>{
          this.toastr.success(response.message??"Успешно добавлено");
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

}
