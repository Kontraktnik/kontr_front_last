import { Component, OnInit } from '@angular/core';
import {JobYear} from "../../../../shared/models/calculation/jobYear/jobYear";
import {JobYearService} from "../../../../shared/services/job-year.service";
import {ServiceYearService} from "../../../../shared/services/service-year.service";
import {JobCategoryService} from "../../../../shared/services/job-category.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";

@Component({
  selector: 'app-job-year-single',
  templateUrl: './job-year-single.component.html',
  styleUrls: ['./job-year-single.component.scss']
})
export class JobYearSingleComponent implements OnInit {
  //@ts-ignore
  id:number;
  //@ts-ignore
  model$:Observable<IResponse<JobYear>>;


  constructor(private service:JobYearService,private toastr:ToastrService,private route: ActivatedRoute,) {
    this.route.params.subscribe(res => {this.id=res.id});
  }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.model$ = this.service.getById(this.id);
  }

}
