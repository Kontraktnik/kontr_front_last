import { Component, OnInit } from '@angular/core';
import {ServiceYear} from "../../../../shared/models/calculation/serviceYear";
import {JobCategory} from "../../../../shared/models/calculation/jobCategory";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {JobYearService} from "../../../../shared/services/job-year.service";
import {ServiceYearService} from "../../../../shared/services/service-year.service";
import {JobCategoryService} from "../../../../shared/services/job-category.service";
import {ToastrService} from "ngx-toastr";
import {JobYear} from "../../../../shared/models/calculation/jobYear/jobYear";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-job-year-update',
  templateUrl: './job-year-update.component.html',
  styleUrls: ['./job-year-update.component.scss']
})
export class JobYearUpdateComponent implements OnInit {

  //@ts-ignore
  jobYear:JobYear;
  serviceYear:ServiceYear[] = [];
  jobCategory:JobCategory[] = [];

  keyword:string = "titleRu";
  //@ts-ignore
  fbGroup:FormGroup;
  validationErrors:ValidationErrors = {status:false,messages:{}};
  //@ts-ignore
  id:number;


  constructor(private service:JobYearService, private serviceYearService : ServiceYearService,private jobCategoryService:JobCategoryService,private toastr:ToastrService,private route: ActivatedRoute,) {
    this.route.params.subscribe(res => {this.id=res.id});
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeData();
    this.initializeServiceYear();
    this.initializeJobCategory();
  }


  initializeForm(){
    this.fbGroup = new FormGroup({
      id:new FormControl("",Validators.required),
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

  initializeData(){
    this.service.getById(this.id).subscribe(
      response=>{
        this.jobYear = response.data;
        this.setForm();
      }
    )
  }

  saveForm(){
    if(this.fbGroup.valid){
      this.service.Update(this.id,this.fbGroup.getRawValue() as JobYear).subscribe(
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


  setForm(){
    if(this.jobYear){
      this.fbGroup.controls["id"].setValue(this.jobYear.id);
      this.fbGroup.controls["jobCategoryId"].setValue(this.jobYear.jobCategoryId);
      this.fbGroup.controls["serviceYearId"].setValue(this.jobYear.serviceYearId);
      this.fbGroup.controls["salary"].setValue(this.jobYear.salary);
    }
  }


}
