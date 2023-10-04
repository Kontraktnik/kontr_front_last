import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {AreaService} from "../../../../shared/services/area.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {Area} from "../../../../shared/models/system/area";

@Component({
  selector: 'app-area-update',
  templateUrl: './area-update.component.html',
  styleUrls: ['./area-update.component.scss']
})
export class AreaUpdateComponent implements OnInit {
  //@ts-ignore
  fbGroup:FormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  //@ts-ignore
  area:Area;
  //@ts-ignore
  id:number;

  constructor(private areaService:AreaService ,private toastr:ToastrService,private route: ActivatedRoute,) {
    this.route.params.subscribe(res => {this.id=res.id});

  }


  ngOnInit(): void {

    this.initializeData();
    this.initializeForm();
  }

  initializeData(){
    this.areaService.getById(this.id).subscribe(
      response=>{
        this.area = response.data;
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
    if(this.area){
      this.fbGroup.controls["id"].setValue(this.area.id);
      this.fbGroup.controls["titleRu"].setValue(this.area.titleRu);
      this.fbGroup.controls["titleEn"].setValue(this.area.titleEn);
      this.fbGroup.controls["titleKz"].setValue(this.area.titleKz);
    }
  }

  saveForm(){
    if(this.fbGroup.valid){
      var model = this.fbGroup.getRawValue() as Area;
      this.areaService.Update(this.id,model).subscribe(
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
