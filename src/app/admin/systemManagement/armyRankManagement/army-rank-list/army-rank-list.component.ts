import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {ArmyDepartment} from "../../../../shared/models/system/armyDepartment";
import {ArmyDepartmentService} from "../../../../shared/services/army-department.service";
import {ArmyRank} from "../../../../shared/models/system/armyRank";
import {ArmyRankService} from "../../../../shared/services/army-rank.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-army-rank-list',
  templateUrl: './army-rank-list.component.html',
  styleUrls: ['./army-rank-list.component.scss']
})
export class ArmyRankListComponent implements OnInit {

  //@ts-ignore
  armyRank$:Observable<IResponse<ArmyRank[]>>

  constructor(private armyRankService:ArmyRankService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.armyRank$ = this.armyRankService.getAll();
  }


  delete(id:number){
    this.armyRankService.Delete(id).subscribe(
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
