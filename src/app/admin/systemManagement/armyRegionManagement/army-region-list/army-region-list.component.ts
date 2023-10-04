import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {ArmyRank} from "../../../../shared/models/system/armyRank";
import {ArmyRankService} from "../../../../shared/services/army-rank.service";
import {ArmyRegion} from "../../../../shared/models/system/armyRegion";
import {ArmyRegionService} from "../../../../shared/services/army-region.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-army-region-list',
  templateUrl: './army-region-list.component.html',
  styleUrls: ['./army-region-list.component.scss']
})
export class ArmyRegionListComponent implements OnInit {
//@ts-ignore
  armyRegion$:Observable<IResponse<ArmyRegion[]>>

  constructor(private armyRegionService:ArmyRegionService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.armyRegion$ = this.armyRegionService.getAll();
  }

  delete(id:number){
    this.armyRegionService.Delete(id).subscribe(
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
