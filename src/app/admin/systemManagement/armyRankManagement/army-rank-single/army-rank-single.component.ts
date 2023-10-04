import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {ArmyDepartment} from "../../../../shared/models/system/armyDepartment";
import {ArmyDepartmentService} from "../../../../shared/services/army-department.service";
import {ActivatedRoute} from "@angular/router";
import {ArmyRank} from "../../../../shared/models/system/armyRank";
import {ArmyRankService} from "../../../../shared/services/army-rank.service";

@Component({
  selector: 'app-army-rank-single',
  templateUrl: './army-rank-single.component.html',
  styleUrls: ['./army-rank-single.component.scss']
})
export class ArmyRankSingleComponent implements OnInit {

  //@ts-ignore
  armyRank$:Observable<IResponse<ArmyRank>>
  //@ts-ignore
  id:number;
  constructor(private armyRankService:ArmyRankService,
              private route: ActivatedRoute,) {

    this.route.params.subscribe(res => {this.id=res.id});

  }

  ngOnInit(): void {

    this.initializeData();
  }

  initializeData(){
    this.armyRank$ = this.armyRankService.getById(this.id);
  }

}
