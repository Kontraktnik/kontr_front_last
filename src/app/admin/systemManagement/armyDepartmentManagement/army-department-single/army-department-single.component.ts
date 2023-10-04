import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {AreaService} from "../../../../shared/services/area.service";
import {ActivatedRoute} from "@angular/router";
import {ArmyDepartment} from "../../../../shared/models/system/armyDepartment";
import {ArmyDepartmentService} from "../../../../shared/services/army-department.service";

@Component({
  selector: 'app-army-department-single',
  templateUrl: './army-department-single.component.html',
  styleUrls: ['./army-department-single.component.scss']
})
export class ArmyDepartmentSingleComponent implements OnInit {

  //@ts-ignore
  armyDepartment$:Observable<IResponse<ArmyDepartment>>
  //@ts-ignore
  id:number;
  constructor(private armyDepartmentService:ArmyDepartmentService,
              private route: ActivatedRoute,) {

    this.route.params.subscribe(res => {this.id=res.id});

  }

  ngOnInit(): void {

    this.initializeData();
  }

  initializeData(){
    this.armyDepartment$ = this.armyDepartmentService.getById(this.id);
  }

}
