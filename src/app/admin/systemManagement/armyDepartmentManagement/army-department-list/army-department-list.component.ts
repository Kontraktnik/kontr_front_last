import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IPagination} from "../../../../shared/helpers/pagination";
import {Area} from "../../../../shared/models/system/area";
import {AreaService} from "../../../../shared/services/area.service";
import {ArmyDepartmentService} from "../../../../shared/services/army-department.service";
import {IResponse} from "../../../../shared/models/common/response";
import {ArmyDepartment} from "../../../../shared/models/system/armyDepartment";
import {Toast, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-army-department-list',
  templateUrl: './army-department-list.component.html',
  styleUrls: ['./army-department-list.component.scss']
})
export class ArmyDepartmentListComponent implements OnInit {
  //@ts-ignore
  armyDepartmentList$:Observable<IResponse<ArmyDepartment[]>>

  constructor(private armyDepartmentService:ArmyDepartmentService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.armyDepartmentList$ = this.armyDepartmentService.getAll();
  }

  delete(id:number){
    this.armyDepartmentService.Delete(id).subscribe(
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
