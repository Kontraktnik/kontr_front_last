import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {ArmyRankService} from "../../../../shared/services/army-rank.service";
import {ToastrService} from "ngx-toastr";
import {ArmyRank} from "../../../../shared/models/system/armyRank";
import {ArmyTypeService} from "../../../../shared/services/army-type.service";
import {ArmyType} from "../../../../shared/models/system/armyType";

@Component({
  selector: 'app-army-type-create',
  templateUrl: './army-type-create.component.html',
  styleUrls: ['./army-type-create.component.scss']
})
export class ArmyTypeCreateComponent implements OnInit {
  //@ts-ignore
  fbGroup:FormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  constructor(private armyTypeService:ArmyTypeService ,private toastr:ToastrService) { }

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
      this.armyTypeService.Create(this.fbGroup.getRawValue() as ArmyType).subscribe(
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
