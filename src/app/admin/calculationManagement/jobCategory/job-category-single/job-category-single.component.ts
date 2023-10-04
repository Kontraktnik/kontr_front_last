import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {CategoryPosition} from "../../../../shared/models/calculation/categoryPosition";
import {CategoryPositionService} from "../../../../shared/services/category-position.service";
import {ActivatedRoute} from "@angular/router";
import {JobCategoryService} from "../../../../shared/services/job-category.service";

@Component({
  selector: 'app-job-category-single',
  templateUrl: './job-category-single.component.html',
  styleUrls: ['./job-category-single.component.scss']
})
export class JobCategorySingleComponent implements OnInit {

  //@ts-ignore
  model$:Observable<IResponse<CategoryPosition>>
  //@ts-ignore
  id:number;
  constructor(private service:JobCategoryService,
              private route: ActivatedRoute,) {

    this.route.params.subscribe(res => {this.id=res.id});

  }

  ngOnInit(): void {

    this.initializeData();
  }

  initializeData(){
    this.model$ = this.service.getById(this.id);
  }

}
