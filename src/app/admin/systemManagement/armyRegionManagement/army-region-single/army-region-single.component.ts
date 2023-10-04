import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {ArmyRank} from "../../../../shared/models/system/armyRank";
import {ArmyRankService} from "../../../../shared/services/army-rank.service";
import {ActivatedRoute} from "@angular/router";
import {ArmyRegion} from "../../../../shared/models/system/armyRegion";
import {ArmyRegionService} from "../../../../shared/services/army-region.service";

@Component({
  selector: 'app-army-region-single',
  templateUrl: './army-region-single.component.html',
  styleUrls: ['./army-region-single.component.scss']
})
export class ArmyRegionSingleComponent implements OnInit {
  //@ts-ignore
  armyRegion$:Observable<IResponse<ArmyRegion>>
  //@ts-ignore
  id:number;
  constructor(private armyRegionService:ArmyRegionService,
              private route: ActivatedRoute,) {

    this.route.params.subscribe(res => {this.id=res.id});

  }

  ngOnInit(): void {

    this.initializeData();
  }

  initializeData(){
    this.armyRegion$ = this.armyRegionService.getById(this.id);
  }

}
