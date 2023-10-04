import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {ArmyDepartment} from "../../../../shared/models/system/armyDepartment";
import {ArmyDepartmentService} from "../../../../shared/services/army-department.service";
import {Role} from "../../../../shared/models/user/role";
import {RoleService} from "../../../../shared/services/role.service";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  //@ts-ignore
  data$:Observable<IResponse<Role[]>>

  constructor(private service:RoleService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.data$ = this.service.getAll(true);
  }

}
