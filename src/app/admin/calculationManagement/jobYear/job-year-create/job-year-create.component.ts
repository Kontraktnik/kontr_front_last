import { Component, OnInit } from '@angular/core';
import {ArmyRank} from "../../../../shared/models/system/armyRank";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {ServiceYear} from "../../../../shared/models/calculation/serviceYear";
import {JobCategory} from "../../../../shared/models/calculation/jobCategory";
import {JobYearService} from "../../../../shared/services/job-year.service";
import {ServiceYearService} from "../../../../shared/services/service-year.service";
import {JobCategoryService} from "../../../../shared/services/job-category.service";
import {RankSalary} from "../../../../shared/models/calculation/rankSalary/rankSalary";
import {JobYear} from "../../../../shared/models/calculation/jobYear/jobYear";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-job-year-create',
  templateUrl: './job-year-create.component.html',
  styleUrls: ['./job-year-create.component.scss']
})
export class JobYearCreateComponent implements OnInit {
  serviceYear:ServiceYear[] = [];
  jobCategory:JobCategory[] = [];

  keyword:string = "titleRu";
  //@ts-ignore
  fbGroup:FormGroup;
  validationErrors:ValidationErrors = {status:false,messages:{}};


  constructor(private service:JobYearService, private serviceYearService : ServiceYearService,private jobCategoryService:JobCategoryService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeServiceYear();
    this.initializeJobCategory();
  }


  initializeForm(){
    this.fbGroup = new FormGroup({
      jobCategoryId:new FormControl("",[Validators.required,Validators.min(1)]),
      serviceYearId:new FormControl("",[Validators.required,Validators.min(1)]),
      salary:new FormControl("",[Validators.required,Validators.min(0),Validators.max(100000000)]),
    })
  }

  initializeServiceYear(){
    this.serviceYearService.getAll(true).subscribe(
      response=>{
        this.serviceYear = response.data;
      }
    )
  }

  initializeJobCategory(){
    this.jobCategoryService.getAll().subscribe(
      response=>{
        this.jobCategory = response.data;
      }
    )
  }

  saveForm(){
    if(this.fbGroup.valid){
      this.service.Create(this.fbGroup.getRawValue() as JobYear).subscribe(
        response=>{
          this.toastr.success(response.message ?? "Saved");
        },
        error => {
          this.toastr.error(error.messages);
          if(error.errors){
            this.validationErrors.messages = error.errors
            this.validationErrors.status = true
          }
        }
      )
    }
  }

  selectJobYear(item: JobCategory) {
    if(item){
     this.fbGroup.controls["jobCategoryId"].setValue(item.id);
    }
  }
  selectServiceYear(item: ServiceYear) {
    if(item){
      this.fbGroup.controls["serviceYearId"].setValue(item.id);
    }
  }

  isClosedJobYearAutoComplete() {
    this.fbGroup.controls["jobCategoryId"].setValue(null);

  }
  isClosedServiceYearAutoComplete() {
    this.fbGroup.controls["serviceYearId"].setValue(null);
  }




}
