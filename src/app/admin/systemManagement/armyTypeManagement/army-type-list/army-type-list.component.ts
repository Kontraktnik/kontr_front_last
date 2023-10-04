import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {ArmyRegion} from "../../../../shared/models/system/armyRegion";
import {ArmyRegionService} from "../../../../shared/services/army-region.service";
import {ArmyType} from "../../../../shared/models/system/armyType";
import {ArmyTypeService} from "../../../../shared/services/army-type.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-army-type-list',
  templateUrl: './army-type-list.component.html',
  styleUrls: ['./army-type-list.component.scss']
})
export class ArmyTypeListComponent implements OnInit {

  //@ts-ignore
  armyType$:Observable<IResponse<ArmyType[]>>

  constructor(private armyTypeService:ArmyTypeService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.armyType$ = this.armyTypeService.getAll();
  }

  delete(id:number){
    this.armyTypeService.Delete(id).subscribe(
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
