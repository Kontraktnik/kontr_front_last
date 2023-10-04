import { Component, OnInit } from '@angular/core';
import {RankSalary} from "../../../../shared/models/calculation/rankSalary/rankSalary";
import {RankSalaryService} from "../../../../shared/services/rank-salary.service";
import {RankSalaryParameters} from "../../../../shared/parameters/rankSalaryParameters";
import {IPagination} from "../../../../shared/helpers/pagination";
import {ArmyRank} from "../../../../shared/models/system/armyRank";
import {ArmyRankService} from "../../../../shared/services/army-rank.service";
import {Position} from "../../../../shared/models/calculation/position/position";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-rank-salary-list',
  templateUrl: './rank-salary-list.component.html',
  styleUrls: ['./rank-salary-list.component.scss']
})
export class RankSalaryListComponent implements OnInit {
  //@ts-ignore
  rankSalaries:IPagination<RankSalary>;
  parameters:RankSalaryParameters = new RankSalaryParameters();
  //@ts-ignore
  armyRanks:ArmyRank[] = [];
  keyword:string = "titleRu";
  perPage:number[] = [5,10,20,50,100];
  constructor(private service:RankSalaryService,private armyRankService:ArmyRankService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeArmyRank();
    this.initializeData();
  }
  onPagerChange(event: any) {
    this.parameters.pageIndex = event;
    this.initializeData();
  }

  initializeData(){
    this.service.getAllWithParam(this.parameters).subscribe(
      response=>{
        //@ts-ignore
        this.rankSalaries = response
      },
      error => {
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

  selectEvent(item: RankSalary) {
    if(item){
      this.parameters.pageIndex = 1;
      this.parameters.rankId = item.id;
      this.initializeData();
    }
  }

  isClosedAutoComplete() {
    this.parameters.pageIndex = 1;
    this.parameters.rankId = null;
    this.initializeData();
  }

  changePageSize(perPage:any){
    perPage = perPage.value;
    if(perPage != null && perPage > 0){
      this.parameters.pageIndex = 1;
      this.parameters.pageSize = perPage;
      this.initializeData();
    }
  }
  delete(id:number){
    this.service.Delete(id).subscribe(
      response=>{
        this.toastr.success(response.message);
        this.initializeData();
      },
      error => {
        if(error.message){
          this.toastr.error(error.message);
        }
      }
    )
  }

}
