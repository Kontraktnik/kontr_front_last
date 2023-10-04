import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {ToastrService} from "ngx-toastr";
import {CategoryPosition} from "../../../../shared/models/calculation/categoryPosition";
import {JobCategoryService} from "../../../../shared/services/job-category.service";

@Component({
  selector: 'app-job-category-create',
  templateUrl: './job-category-create.component.html',
  styleUrls: ['./job-category-create.component.scss']
})
export class JobCategoryCreateComponent implements OnInit {

  //@ts-ignore
  fbGroup:FormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  constructor(private service:JobCategoryService ,private toastr:ToastrService) { }

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
          this.clearFomr();
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

  clearFomr(){
    this.fbGroup.reset();
  }

}
