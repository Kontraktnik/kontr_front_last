import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {ArmyRank} from "../../../../shared/models/system/armyRank";
import {ArmyRankService} from "../../../../shared/services/army-rank.service";
import {ActivatedRoute} from "@angular/router";
import {ArmyType} from "../../../../shared/models/system/armyType";
import {ArmyTypeService} from "../../../../shared/services/army-type.service";

@Component({
  selector: 'app-army-type-single',
  templateUrl: './army-type-single.component.html',
  styleUrls: ['./army-type-single.component.scss']
})
export class ArmyTypeSingleComponent implements OnInit {

  //@ts-ignore
  armyType$:Observable<IResponse<ArmyType>>
  //@ts-ignore
  id:number;
  constructor(private armyTypeService:ArmyTypeService,
              private route: ActivatedRoute,) {

    this.route.params.subscribe(res => {this.id=res.id});

  }

  ngOnInit(): void {

    this.initializeData();
  }

  initializeData(){
    this.armyType$ = this.armyTypeService.getById(this.id);
  }

}
