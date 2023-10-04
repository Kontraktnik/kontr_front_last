import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {RelativeService} from "../../../../shared/services/relative.service";
import {ToastrService} from "ngx-toastr";
import {Relative} from "../../../../shared/models/system/relative";
import {VtshService} from "../../../../shared/services/vtsh.service";
import {Vtsh} from "../../../../shared/models/system/vtsh";

@Component({
  selector: 'app-vtsh-create',
  templateUrl: './vtsh-create.component.html',
  styleUrls: ['./vtsh-create.component.scss']
})
export class VtshCreateComponent implements OnInit {

  //@ts-ignore
  fbGroup:FormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  constructor(private service:VtshService ,private toastr:ToastrService) { }

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
      this.service.Create(this.fbGroup.getRawValue() as Vtsh).subscribe(
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
