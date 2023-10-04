import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {ArmyTypeService} from "../../../../shared/services/army-type.service";
import {ArmyType} from "../../../../shared/models/system/armyType";

@Component({
  selector: 'app-army-type-update',
  templateUrl: './army-type-update.component.html',
  styleUrls: ['./army-type-update.component.scss']
})
export class ArmyTypeUpdateComponent implements OnInit {

  //@ts-ignore
  fbGroup:FormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  //@ts-ignore
  data:ArmyType;
  //@ts-ignore
  id:number;

  constructor(private armyTypeService:ArmyTypeService ,private toastr:ToastrService,private route: ActivatedRoute,) {
    this.route.params.subscribe(res => {this.id=res.id});

  }


  ngOnInit(): void {

    this.initializeData();
    this.initializeForm();
  }

  initializeData(){
    this.armyTypeService.getById(this.id).subscribe(
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
      var model = this.fbGroup.getRawValue() as ArmyType;
      this.armyTypeService.Update(this.id,model).subscribe(
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
