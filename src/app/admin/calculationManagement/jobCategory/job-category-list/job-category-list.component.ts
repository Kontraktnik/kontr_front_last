import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {CategoryPosition} from "../../../../shared/models/calculation/categoryPosition";
import {CategoryPositionService} from "../../../../shared/services/category-position.service";
import {JobCategory} from "../../../../shared/models/calculation/jobCategory";
import {JobCategoryService} from "../../../../shared/services/job-category.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-job-category-list',
  templateUrl: './job-category-list.component.html',
  styleUrls: ['./job-category-list.component.scss']
})
export class JobCategoryListComponent implements OnInit {

  //@ts-ignore
  jobCategory$:Observable<IResponse<JobCategory[]>>

  constructor(private service:JobCategoryService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.jobCategory$ = this.service.getAll();
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
