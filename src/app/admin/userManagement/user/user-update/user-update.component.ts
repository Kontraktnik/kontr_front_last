import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {Area} from "../../../../shared/models/system/area";
import {Role} from "../../../../shared/models/user/role";
import {UserService} from "../../../../shared/services/user.service";
import {AreaService} from "../../../../shared/services/area.service";
import {RoleService} from "../../../../shared/services/role.service";
import {ToastrService} from "ngx-toastr";
import {IUser} from "../../../../shared/models/user/user";
import {Roles} from "../../../../shared/constants/roles";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  //@ts-ignore
  iin:string;
  //@ts-ignore
  user:IUser;
  //@ts-ignore
  fbGroup:FormGroup;
  validationErrors:ValidationErrors = {status:false,messages:{}};
  areas:Area[] = [];
  roles:Role[] = [];
  keyword:string = "titleRu";
  showArea:boolean = false;

  constructor(
    private service:UserService,
    private areaService:AreaService,
    private roleService:RoleService,
    private toastr:ToastrService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(res => {this.iin=res.iin});
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeData();
    this.initializeRole();
    this.initializeArea();
  }

  initializeData(){
    this.service.getByIIN(this.iin).subscribe(
      response=>{
        this.user = response.data;
        this.setForm();
      }
    )
  }

  initializeForm(){
    this.fbGroup = new FormGroup({
      id:new FormControl("",Validators.required),
      roleId:new FormControl("",Validators.required),
      areaId:new FormControl(""),
      iin: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(12),]),
      password: new FormControl('', [Validators.minLength(6)]),
      name: new FormControl('', [Validators.required, Validators.pattern("^[а-яА-ЯёЁәӘіІңҢғҒүҮұҰқҚөӨһҺ]*$")]),
      surname: new FormControl('', [Validators.required, Validators.pattern("^[а-яА-ЯёЁәӘіІңҢғҒүҮұҰқҚөӨһҺ]*$")]),
      patronymic: new FormControl('', [Validators.pattern("^[а-яА-ЯёЁәӘіІңҢғҒүҮұҰқҚөӨһҺ]*$")]),
      phone: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.required, Validators.email]),
      verified:new FormControl(true),
      status:new FormControl(true)
    })
  }

  setForm(){
    if(this.user){
      if(this.user.roleId == Roles.ADMINISTRATOR || this.user.roleId == Roles.USER ){
        this.showArea = false;
      }
        this.fbGroup.controls["id"].setValue(this.user.id);
      this.fbGroup.controls["roleId"].setValue(this.user.roleId);
      this.fbGroup.controls["areaId"].setValue(this.user.areaId);
      this.fbGroup.controls["iin"].setValue(this.user.iin);
      this.fbGroup.controls["name"].setValue(this.user.name);
      this.fbGroup.controls["surname"].setValue(this.user.surname);
      this.fbGroup.controls["patronymic"].setValue(this.user.patronymic);
      this.fbGroup.controls["phone"].setValue(this.user.phone);
      this.fbGroup.controls["email"].setValue(this.user.email);
      this.fbGroup.controls["verified"].setValue(this.user.verified);
      this.fbGroup.controls["status"].setValue(this.user.status);
    }
  }


  saveForm(){
    if(this.fbGroup.valid){
      this.service.Update(this.user.id,this.fbGroup.getRawValue() as IUser).subscribe(
        response=>{
          this.toastr.success(response.message??"Успешно добавлено");
        },
        error => {
          if(error.errors){
            this.validationErrors.messages = error.errors
            this.validationErrors.status = true
          }
        }
      )
    }
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

  selectRoleEvent(item: Role) {
    if(item){
      this.showArea = true;
      this.fbGroup.controls["roleId"].setValue(item.id);
      if(item.id == Roles.DIRECTOR || item.id == Roles.EXECUTOR || item.id == Roles.KNB || item.id == Roles.MED ){
        this.fbGroup.controls["areaId"].setValidators(Validators.required);
      }
      else{
        this.showArea = false;
        this.fbGroup.controls["areaId"].setValue(null);
        this.fbGroup.controls["areaId"].removeValidators(Validators.required);
      }
    }
  }
  isClosedRoleAutoComplete() {
    this.fbGroup.controls["roleId"].setValue(null);
    this.fbGroup.controls["areaId"].setValue(null);
    this.showArea = true;
  }

  selectAreaEvent(item: Area) {
    if(item){
      this.fbGroup.controls["areaId"].setValue(item.id);
    }
  }

  isClosedAreaAutoComplete() {
    this.fbGroup.controls["areaId"].setValue(null);
  }

}
