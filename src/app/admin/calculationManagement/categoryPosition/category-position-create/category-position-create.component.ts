import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {ArmyDepartmentService} from "../../../../shared/services/army-department.service";
import {ToastrService} from "ngx-toastr";
import {ArmyDepartment} from "../../../../shared/models/system/armyDepartment";
import {CategoryPositionService} from "../../../../shared/services/category-position.service";
import {CategoryPosition} from "../../../../shared/models/calculation/categoryPosition";

@Component({
  selector: 'app-category-position-create',
  templateUrl: './category-position-create.component.html',
  styleUrls: ['./category-position-create.component.scss']
})
export class CategoryPositionCreateComponent implements OnInit {

  //@ts-ignore
  fbGroup:FormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  constructor(private service:CategoryPositionService ,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.fbGroup = new FormGroup({
      titleRu:new FormControl("",Validators.required),
      titleEn:new FormControl("",Validators.required),
      titleKz:new FormControl("",Validators.required)
    })
  }


  saveForm(){
    if(this.fbGroup.valid){
      this.service.Create(this.fbGroup.getRawValue() as CategoryPosition).subscribe(
        response=>{
          this.toastr.success(response.message??"Успешно добавлено");
          this.clearForm();
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

  clearForm(){
    this.fbGroup.reset();
  }

}
