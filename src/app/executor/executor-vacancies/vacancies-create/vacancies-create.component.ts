import { Component, OnInit } from '@angular/core';
import {ExecutorVacancyService} from "../../executor-vacancy.service";
import {PositionService} from "../../../shared/services/position.service";
import {JobCategoryService} from "../../../shared/services/job-category.service";
import {ArmyTypeService} from "../../../shared/services/army-type.service";
import {ArmyRegionService} from "../../../shared/services/army-region.service";
import {QualificationService} from "../../../shared/services/qualification.service";
import {SecretLevelService} from "../../../shared/services/secret-level.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Position} from "../../../shared/models/calculation/position/position";
import {JobCategory} from "../../../shared/models/calculation/jobCategory";
import {ArmyType} from "../../../shared/models/system/armyType";
import {ArmyRegion} from "../../../shared/models/system/armyRegion";
import {SecretLevel} from "../../../shared/models/calculation/secretLevel";
import {Qualification} from "../../../shared/models/calculation/qualification";
import {IUser} from "../../../shared/models/user/user";
import {Vacancy} from "../../../shared/models/vacancy/vacancy";
import {ToastrService} from "ngx-toastr";
import {ValidationErrors} from "../../../shared/models/common/validation_errors";

@Component({
  selector: 'app-vacancies-create',
  templateUrl: './vacancies-create.component.html',
  styleUrls: ['./vacancies-create.component.scss']
})
export class VacanciesCreateComponent implements OnInit {
  //@ts-ignore
  fbGroup:FormGroup;
  position:Position[] = [];
  jobCategory:JobCategory[] = [];
  armyType:ArmyType[] = [];
  armyRegion: ArmyRegion[] = [];
  secretLevel:SecretLevel[] = [];
  qualification:Qualification[] = [];
  keyword:string = "titleRu";
  validationErrors:ValidationErrors = {status:false,messages:{}};

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
    this.initializeOtherData();
    this.initializeForm();
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

  initializeForm(){
    this.fbGroup = new FormGroup({
      positionId: new FormControl("", [Validators.required]),
      jobCategoryId:new FormControl("", [Validators.required]),
      city:new FormControl("", [Validators.required]),
      armyTypeId:new FormControl("",[Validators.required]),
      armyRegionId:new FormControl("",[Validators.required]),
      secretLevelId:new FormControl("",[Validators.required]),
      qualificationId:new FormControl("",[Validators.required]),
      quantity:new FormControl("",[Validators.required,Validators.min(0)]),
      status:new FormControl(true,[Validators.required]),
      descriptionRu :new FormControl("",[Validators.required]),
      descriptionKz :new FormControl("",[Validators.required]),
      descriptionEn :new FormControl("",),
    });
  }

  selectPositionEvent(item: Position) {
    if(item){
      this.fbGroup.controls["positionId"].setValue(item.id);
    }
  }
  isClosedPositionAutoComplete() {
    this.fbGroup.controls["positionId"].setValue(null);
  }

  selectJobCategoryEvent(item: JobCategory) {
    if(item){
      this.fbGroup.controls["jobCategoryId"].setValue(item.id);
    }
  }
  isClosedJobCategoryAutoComplete() {
    this.fbGroup.controls["jobCategoryId"].setValue(null);
  }

  selectArmyTypeEvent(item: ArmyType) {
    if(item){
      this.fbGroup.controls["armyTypeId"].setValue(item.id);

    }
  }
  isClosedArmyTypeAutoComplete() {
    this.fbGroup.controls["armyTypeId"].setValue(null);

  }

  selectArmyRegionEvent(item: ArmyRegion) {
    if(item){
      this.fbGroup.controls["armyRegionId"].setValue(item.id);
    }
  }
  isClosedArmyRegionAutoComplete() {
    this.fbGroup.controls["armyRegionId"].setValue(null);

  }

  selectQualificationEvent(item: Qualification) {
    if(item){
      this.fbGroup.controls["qualificationId"].setValue(item.id);

    }
  }
  isClosedQualificationAutoComplete() {
    this.fbGroup.controls["qualificationId"].setValue(null);

  }

  selectSecretLevelEvent(item: SecretLevel) {
    if(item){
      this.fbGroup.controls["secretLevelId"].setValue(item.id);

    }
  }
  isClosedSecretLevelAutoComplete() {
    this.fbGroup.controls["secretLevelId"].setValue(null);
  }

  saveForm(){
    if(this.fbGroup.valid){
      this.service.Create(this.fbGroup.getRawValue() as Vacancy).subscribe(
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

  clearForm(){
    this.fbGroup.reset();
  }

}
