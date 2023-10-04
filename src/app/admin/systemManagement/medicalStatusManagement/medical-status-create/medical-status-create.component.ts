import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {DriverLicenseService} from "../../../../shared/services/driver-license.service";
import {ToastrService} from "ngx-toastr";
import {DriverLicense} from "../../../../shared/models/system/driverLicense";
import {MedicalStatusService} from "../../../../shared/services/medical-status.service";
import {MedicalStatus} from "../../../../shared/models/system/medicalStatus";

@Component({
  selector: 'app-medical-status-create',
  templateUrl: './medical-status-create.component.html',
  styleUrls: ['./medical-status-create.component.scss']
})
export class MedicalStatusCreateComponent implements OnInit {

  //@ts-ignore
  fbGroup:FormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  constructor(private service:MedicalStatusService ,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.fbGroup = new FormGroup({
      code:new FormControl("",Validators.required),
      titleRu:new FormControl("",Validators.required),
      titleEn:new FormControl("",Validators.required),
      titleKz:new FormControl("",Validators.required)
    })
  }


  saveForm(){
    if(this.fbGroup.valid){
      this.service.Create(this.fbGroup.getRawValue() as MedicalStatus).subscribe(
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
