import { Component, OnInit } from '@angular/core';
import {JobYearService} from "../../../../shared/services/job-year.service";
import {ServiceYearService} from "../../../../shared/services/service-year.service";
import {JobCategoryService} from "../../../../shared/services/job-category.service";
import {ServiceYear} from "../../../../shared/models/calculation/serviceYear";
import {JobCategory} from "../../../../shared/models/calculation/jobCategory";
import {RankSalaryParameters} from "../../../../shared/parameters/rankSalaryParameters";
import {JobYearParameters} from "../../../../shared/parameters/jobYearParameters";
import {IPagination} from "../../../../shared/helpers/pagination";
import {RankSalary} from "../../../../shared/models/calculation/rankSalary/rankSalary";
import {JobYear} from "../../../../shared/models/calculation/jobYear/jobYear";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-job-year-list',
  templateUrl: './job-year-list.component.html',
  styleUrls: ['./job-year-list.component.scss']
})
export class JobYearListComponent implements OnInit {
  //@ts-ignore
  jobYears:IPagination<JobYear>;
  serviceYear:ServiceYear[] = [];
  jobCategory:JobCategory[] = [];
  keyword:string = "titleRu";
  perPage:number[] = [5,10,20,50,100];
  parameters:JobYearParameters = new JobYearParameters();

  constructor(private service:JobYearService, private serviceYearService : ServiceYearService,private jobCategoryService:JobCategoryService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeJobCategory();
    this.initializeServiceYear();
    this.initializeData();
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
    this.service.getAllWithParam(this.parameters).subscribe(
      response=>{
        //@ts-ignore
        this.jobYears = response;
      }
    )
  }

  onPagerChange(event: any) {
    this.parameters.pageIndex = event;
    this.initializeData();
  }

  selectJobYear(item: JobCategory) {
    if(item){
      this.parameters.pageIndex = 1;
      this.parameters.jobCategoryId = item.id;
      this.initializeData();
    }
  }
  selectServiceYear(item: ServiceYear) {
    if(item){
      this.parameters.pageIndex = 1;
      this.parameters.serviceYearId = item.id;
      this.initializeData();
    }
  }

  isClosedJobYearAutoComplete() {
    this.parameters.pageIndex = 1;
    this.parameters.jobCategoryId = null;
    this.initializeData();
  }
  isClosedServiceYearAutoComplete() {
    this.parameters.pageIndex = 1;
    this.parameters.serviceYearId = null;
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
