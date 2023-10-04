import { Component, OnInit } from '@angular/core';
import {ArmyRank} from "../../../../shared/models/system/armyRank";
import {RankSalaryService} from "../../../../shared/services/rank-salary.service";
import {ArmyRankService} from "../../../../shared/services/army-rank.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RankSalary} from "../../../../shared/models/calculation/rankSalary/rankSalary";
import {ToastrService} from "ngx-toastr";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";

@Component({
  selector: 'app-rank-salary-create',
  templateUrl: './rank-salary-create.component.html',
  styleUrls: ['./rank-salary-create.component.scss']
})
export class RankSalaryCreateComponent implements OnInit {
  armyRanks:ArmyRank[] = [];
  keyword:string = "titleRu";
  //@ts-ignore
  fbGroup:FormGroup;
  validationErrors:ValidationErrors = {status:false,messages:{}};

  constructor(private service:RankSalaryService,private armyRankService:ArmyRankService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeArmyRank();
  }

  initializeForm(){
    this.fbGroup = new FormGroup({
      armyRankId:new FormControl("",[Validators.required,Validators.min(1)]),
      salary:new FormControl("",[Validators.required,Validators.min(1)]),
    })
  }

  initializeArmyRank(){
    this.armyRankService.getAll(false).subscribe(
      response=>{
        this.armyRanks = response.data;
      }
    );
  }

  saveForm(){
    if(this.fbGroup.valid){
      this.service.Create(this.fbGroup.getRawValue() as RankSalary).subscribe(
        response=>{
          this.toastr.success(response.message ?? "Saved");
        },
        error => {
          this.toastr.error(error.messages);
          if(error.errors){
            this.validationErrors.messages = error.errors
            this.validationErrors.status = true
          }
        }
      )
    }
  }

  selectEvent(item: RankSalary) {
    if(item){
      this.fbGroup.controls["armyRankId"].setValue(item.id);
    }
  }

  isClosedAutoComplete() {
    this.fbGroup.controls["armyRankId"].setValue(null);
  }

}
