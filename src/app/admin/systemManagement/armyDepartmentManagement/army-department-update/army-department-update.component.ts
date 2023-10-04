import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {Area} from "../../../../shared/models/system/area";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {ArmyDepartmentService} from "../../../../shared/services/army-department.service";
import {ArmyDepartment} from "../../../../shared/models/system/armyDepartment";

@Component({
  selector: 'app-army-department-update',
  templateUrl: './army-department-update.component.html',
  styleUrls: ['./army-department-update.component.scss']
})
export class ArmyDepartmentUpdateComponent implements OnInit {
//@ts-ignore
  fbGroup:FormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  //@ts-ignore
  data:ArmyDepartment;
  //@ts-ignore
  id:number;

  constructor(private armyDepartmentService:ArmyDepartmentService ,private toastr:ToastrService,private route: ActivatedRoute,) {
    this.route.params.subscribe(res => {this.id=res.id});

  }


  ngOnInit(): void {

    this.initializeData();
    this.initializeForm();
  }

  initializeData(){
    this.armyDepartmentService.getById(this.id).subscribe(
      response=>{
        this.data = response.data;
        this.setForm();
      },
      error => {

      }
    );
  }

  initializeForm(){
    this.fbGroup = new FormGroup({
      id:new FormControl(),
      titleRu:new FormControl("",Validators.required),
      titleEn:new FormControl("",Validators.required),
      titleKz:new FormControl("",Validators.required)
    });
  }

  setForm(){
    if(this.data){
      this.fbGroup.controls["id"].setValue(this.data.id);
      this.fbGroup.controls["titleRu"].setValue(this.data.titleRu);
      this.fbGroup.controls["titleEn"].setValue(this.data.titleEn);
      this.fbGroup.controls["titleKz"].setValue(this.data.titleKz);
    }
  }

  saveForm(){
    if(this.fbGroup.valid){
      var model = this.fbGroup.getRawValue() as Area;
      this.armyDepartmentService.Update(this.id,model).subscribe(
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

}
