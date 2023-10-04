import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {ArmyDepartment} from "../../../../shared/models/system/armyDepartment";
import {ArmyDepartmentService} from "../../../../shared/services/army-department.service";
import {CategoryPosition} from "../../../../shared/models/calculation/categoryPosition";
import {CategoryPositionService} from "../../../../shared/services/category-position.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-category-position-list',
  templateUrl: './category-position-list.component.html',
  styleUrls: ['./category-position-list.component.scss']
})
export class CategoryPositionListComponent implements OnInit {

  //@ts-ignore
  categoryPosition$:Observable<IResponse<CategoryPosition[]>>

  constructor(private service:CategoryPositionService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.categoryPosition$ = this.service.getAll();
  }

  delete(id:number){
    this.service.Delete(id).subscribe(
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
