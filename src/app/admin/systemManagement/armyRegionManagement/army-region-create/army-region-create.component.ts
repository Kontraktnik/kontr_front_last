import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {ArmyRankService} from "../../../../shared/services/army-rank.service";
import {ToastrService} from "ngx-toastr";
import {ArmyRank} from "../../../../shared/models/system/armyRank";
import {ArmyRegionService} from "../../../../shared/services/army-region.service";
import {ArmyRegion} from "../../../../shared/models/system/armyRegion";

@Component({
  selector: 'app-army-region-create',
  templateUrl: './army-region-create.component.html',
  styleUrls: ['./army-region-create.component.scss']
})
export class ArmyRegionCreateComponent implements OnInit {
  //@ts-ignore
  fbGroup:FormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  constructor(private armyRegionService:ArmyRegionService ,private toastr:ToastrService) { }

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
      this.armyRegionService.Create(this.fbGroup.getRawValue() as ArmyRegion).subscribe(
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
