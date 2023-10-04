import { Component, OnInit } from '@angular/core';
import {RankSalaryService} from "../../../../shared/services/rank-salary.service";
import {ArmyRankService} from "../../../../shared/services/army-rank.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {Qualification} from "../../../../shared/models/calculation/qualification";
import {RankSalary} from "../../../../shared/models/calculation/rankSalary/rankSalary";

@Component({
  selector: 'app-rank-salary-single',
  templateUrl: './rank-salary-single.component.html',
  styleUrls: ['./rank-salary-single.component.scss']
})
export class RankSalarySingleComponent implements OnInit {

  //@ts-ignore
  id:number;
  //@ts-ignore
  model$:Observable<IResponse<RankSalary>>

  constructor(private service:RankSalaryService,private armyRankService:ArmyRankService,private toastr:ToastrService,private route: ActivatedRoute,)
  {
    this.route.params.subscribe(res => {this.id=res.id});

  }

  ngOnInit(): void {

    this.initializeData();
  }

  initializeData(){
    this.model$ = this.service.getById(this.id);
  }

}
