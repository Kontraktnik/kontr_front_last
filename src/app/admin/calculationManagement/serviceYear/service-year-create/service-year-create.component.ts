import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {ToastrService} from "ngx-toastr";
import {ServiceYearService} from "../../../../shared/services/service-year.service";
import {ServiceYear} from "../../../../shared/models/calculation/serviceYear";

@Component({
  selector: 'app-service-year-create',
  templateUrl: './service-year-create.component.html',
  styleUrls: ['./service-year-create.component.scss']
})
export class ServiceYearCreateComponent implements OnInit {

  //@ts-ignore
  fbGroup:FormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  constructor(private service:ServiceYearService ,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.fbGroup = new FormGroup({
      titleRu:new FormControl("",Validators.required),
      titleEn:new FormControl("",Validators.required),
      titleKz:new FormControl("",Validators.required),
      min:new FormControl("",Validators.required),
      max:new FormControl("",Validators.required),

    })
  }


  saveForm(){
    if(this.fbGroup.valid){
      this.service.Create(this.fbGroup.getRawValue() as ServiceYear).subscribe(
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
