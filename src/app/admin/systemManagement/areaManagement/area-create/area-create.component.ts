import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AreaService} from "../../../../shared/services/area.service";
import {Area} from "../../../../shared/models/system/area";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";

@Component({
  selector: 'app-area-create',
  templateUrl: './area-create.component.html',
  styleUrls: ['./area-create.component.scss']
})
export class AreaCreateComponent implements OnInit {
  //@ts-ignore
  fbGroup:FormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  constructor(private areaService:AreaService ,private toastr:ToastrService) { }

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
      this.areaService.Create(this.fbGroup.getRawValue() as Area).subscribe(
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
