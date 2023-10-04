import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {Qualification} from "../../../../shared/models/calculation/qualification";
import {QualificationService} from "../../../../shared/services/qualification.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {ServiceYear} from "../../../../shared/models/calculation/serviceYear";
import {ServiceYearService} from "../../../../shared/services/service-year.service";

@Component({
  selector: 'app-service-year-update',
  templateUrl: './service-year-update.component.html',
  styleUrls: ['./service-year-update.component.scss']
})
export class ServiceYearUpdateComponent implements OnInit {

  //@ts-ignore
  fbGroup:FormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  //@ts-ignore
  data:ServiceYear;
  //@ts-ignore
  id:number;

  constructor(private service:ServiceYearService ,private toastr:ToastrService,private route: ActivatedRoute,) {
    this.route.params.subscribe(res => {this.id=res.id});

  }


  ngOnInit(): void {

    this.initializeData();
    this.initializeForm();
  }

  initializeData(){
    this.service.getById(this.id).subscribe(
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
      titleKz:new FormControl("",Validators.required),
      min:new FormControl("",Validators.required),
      max:new FormControl("",Validators.required),

    });
  }

  setForm(){
    if(this.data){
      this.fbGroup.controls["id"].setValue(this.data.id);
      this.fbGroup.controls["titleRu"].setValue(this.data.titleRu);
      this.fbGroup.controls["titleEn"].setValue(this.data.titleEn);
      this.fbGroup.controls["titleKz"].setValue(this.data.titleKz);
      this.fbGroup.controls["min"].setValue(this.data?.["min"]);
      this.fbGroup.controls["max"].setValue(this.data?.["max"]);

    }
  }

  saveForm(){
    if(this.fbGroup.valid){
      var model = this.fbGroup.getRawValue() as ServiceYear;
      this.service.Update(this.id,model).subscribe(
        response=>{
          this.toastr.success(response.message??"Успешно изменено");
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
