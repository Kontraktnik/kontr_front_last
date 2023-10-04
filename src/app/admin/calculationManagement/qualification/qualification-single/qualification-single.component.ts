import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {CategoryPosition} from "../../../../shared/models/calculation/categoryPosition";
import {JobCategoryService} from "../../../../shared/services/job-category.service";
import {ActivatedRoute} from "@angular/router";
import {Qualification} from "../../../../shared/models/calculation/qualification";
import {QualificationService} from "../../../../shared/services/qualification.service";

@Component({
  selector: 'app-qualification-single',
  templateUrl: './qualification-single.component.html',
  styleUrls: ['./qualification-single.component.scss']
})
export class QualificationSingleComponent implements OnInit {

  //@ts-ignore
  model$:Observable<IResponse<Qualification>>
  //@ts-ignore
  id:number;
  constructor(private service:QualificationService,
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
