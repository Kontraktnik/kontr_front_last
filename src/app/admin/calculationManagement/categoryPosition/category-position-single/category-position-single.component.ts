import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {ArmyDepartment} from "../../../../shared/models/system/armyDepartment";
import {ArmyDepartmentService} from "../../../../shared/services/army-department.service";
import {ActivatedRoute} from "@angular/router";
import {CategoryPosition} from "../../../../shared/models/calculation/categoryPosition";
import {CategoryPositionService} from "../../../../shared/services/category-position.service";

@Component({
  selector: 'app-category-position-single',
  templateUrl: './category-position-single.component.html',
  styleUrls: ['./category-position-single.component.scss']
})
export class CategoryPositionSingleComponent implements OnInit {

  //@ts-ignore
  model$:Observable<IResponse<CategoryPosition>>
  //@ts-ignore
  id:number;
  constructor(private service:CategoryPositionService,
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
