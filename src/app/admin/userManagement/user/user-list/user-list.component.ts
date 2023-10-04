import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../shared/services/user.service";
import {AreaService} from "../../../../shared/services/area.service";
import {RoleService} from "../../../../shared/services/role.service";
import {Area} from "../../../../shared/models/system/area";
import {Role} from "../../../../shared/models/user/role";
import {IPagination} from "../../../../shared/helpers/pagination";
import {IUser} from "../../../../shared/models/user/user";
import {UserParameters} from "../../../../shared/parameters/userParameters";
import { faCheck,faTimes,faTimesCircle  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  faCheck = faCheck;
  faTimes = faTimes;
  areas:Area[] = [];
  roles:Role[] = [];
  perPage:number[] = [5,10,20,50,100];
  keyword:string = "titleRu";
  //@ts-ignore
  usersData:IPagination<IUser>;
  parameters:UserParameters = new UserParameters();

  constructor(
    private service:UserService,
    private areaService:AreaService,
    private roleService:RoleService,

  ) { }

  ngOnInit(): void {
    this.initializeRole();
    this.initializeArea();
    this.initializeData();
  }

  initializeData(){
    this.service.getAll(this.parameters).subscribe(
      response=>{
        //@ts-ignore
        this.usersData = response;
      }
    )
  }

  initializeRole(){
    this.roleService.getAll(true).subscribe(
      response=>{
        this.roles = response.data;
      }
    )
  }


  initializeArea(){
    this.areaService.getAll(true).subscribe(
      response=>{
        this.areas = response.data;
      }
    )
  }

  changePageSize(perPage:any){
    perPage = perPage.value;
    if(perPage != null && perPage > 0){
      this.parameters.pageIndex = 1;
      this.parameters.pageSize = perPage;
      this.initializeData();
    }
  }

  onPagerChange(event: any) {
    this.parameters.pageIndex = event;
    this.initializeData();
  }

  selectAreaEvent(item: Area) {
    if(item){
      this.parameters.pageIndex = 1;
      this.parameters.areaId = item.id;
      this.initializeData();
    }
  }

  isClosedAreaAutoComplete() {
    this.parameters.pageIndex = 1;
    this.parameters.areaId = null;
    this.initializeData();
  }

  selectRoleEvent(item: Role) {
    if(item){
      this.parameters.pageIndex = 1;
      this.parameters.roleId = item.id;
      this.initializeData();
    }
  }
  isClosedRoleAutoComplete() {
    this.parameters.pageIndex = 1;
    this.parameters.roleId = null;
    this.initializeData();
  }
  onSearch(){
    if(this.parameters.search != null && this.parameters.search?.length> 3){
      this.parameters.pageIndex = 1;
      this.initializeData();
    }
    else{
      this.initializeData();
    }
  }

  selectVerified(result:any){
    this.parameters.verified = result.value;
    this.initializeData();
  }
  selectStatus(result:any){
    this.parameters.status = result.value;
    this.initializeData();
  }

}
