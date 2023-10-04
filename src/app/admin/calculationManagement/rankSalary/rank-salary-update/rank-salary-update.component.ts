import { Component, OnInit } from '@angular/core';
import {RankSalaryService} from "../../../../shared/services/rank-salary.service";
import {ArmyRankService} from "../../../../shared/services/army-rank.service";
import {ToastrService} from "ngx-toastr";
import {ArmyRank} from "../../../../shared/models/system/armyRank";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {ActivatedRoute} from "@angular/router";
import {RankSalary} from "../../../../shared/models/calculation/rankSalary/rankSalary";

@Component({
  selector: 'app-rank-salary-update',
  templateUrl: './rank-salary-update.component.html',
  styleUrls: ['./rank-salary-update.component.scss']
})
export class RankSalaryUpdateComponent implements OnInit {
  armyRanks:ArmyRank[] = [];
  //@ts-ignore
  armyRankSalary:RankSalary;
  keyword:string = "titleRu";
  //@ts-ignore
  fbGroup:FormGroup;
  validationErrors:ValidationErrors = {status:false,messages:{}};
  //@ts-ignore
  id:number;

  constructor(private service:RankSalaryService,private armyRankService:ArmyRankService,private toastr:ToastrService,private route: ActivatedRoute,)
  {
    this.route.params.subscribe(res => {this.id=res.id});

  }

  ngOnInit(): void {
    this.initializeData();
    this.initializeForm();
    this.initializeArmyRank();
  }

  initializeForm(){
    this.fbGroup = new FormGroup({
      id:new FormControl("",Validators.required),
      armyRankId:new FormControl("",[Validators.required,Validators.min(1)]),
      salary:new FormControl("",[Validators.required,Validators.min(1)]),
    })
  }

  initializeData(){
    this.service.getById(this.id).subscribe(
      response=>{
        this.armyRankSalary = response.data;
        this.setForm();
      }
    )
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
      this.service.Update(this.id,this.fbGroup.getRawValue() as RankSalary).subscribe(
        response=>{
          this.toastr.success(response.message ?? "Saved");
        },
        error => {
          if(error.errors){
            this.validationErrors.messages = error.errors
            this.validationErrors.status = true;
            this.toastr.error(error.errors.detail);
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

  setForm(){
    if(this.armyRankSalary){
      this.fbGroup.controls["id"].setValue(this.armyRankSalary.id);
      this.fbGroup.controls["armyRankId"].setValue(this.armyRankSalary.id);
      this.fbGroup.controls["salary"].setValue(this.armyRankSalary.salary);

    }
  }
}
