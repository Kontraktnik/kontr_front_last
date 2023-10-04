import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../shared/models/user/user";
import {Education} from "../../../shared/models/system/education";
import {ArmyRank} from "../../../shared/models/system/armyRank";
import {Vtsh} from "../../../shared/models/system/vtsh";
import {Position} from "../../../shared/models/calculation/position/position";
import {StatisticParameters} from "../statistics/statisticParameters";
import {Step} from "../../../shared/models/step/step";
import {IPagination} from "../../../shared/helpers/pagination";
import {Survey} from "../../../shared/models/survey/survey";
import {DirectorService} from "../../director.service";
import {EducationService} from "../../../shared/services/education.service";
import {ArmyRankService} from "../../../shared/services/army-rank.service";
import {VtshService} from "../../../shared/services/vtsh.service";
import {PositionService} from "../../../shared/services/position.service";
import {StepService} from "../../../shared/services/step.service";
import {AllRequestParameters} from "./allRequestParameters";

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss']
})
export class AllRequestsComponent implements OnInit {
  educations:Education[] = [];
  armyRanks:ArmyRank[] = [];
  vtsh:Vtsh[] = [];
  position:Position[] = [];
  parameters:AllRequestParameters = new AllRequestParameters();
  steps:Step[] = [];
  perPage:number[] = [5,10,20,50,100];

  statuses = [
    {titleRu:"Все",titleKz:"Все",titleEn:"All",id:null},
    {titleRu:"Принято",titleKz:"Принято",titleEn:"Accepted",id:1},
    {titleRu:"В работе",titleKz:"В работе",titleEn:"On word",id:0},
    {titleRu:"Отказано",titleKz:"Отказано",titleEn:"Rejected",id:-1},
  ]
  keyword:string = "titleRu";
  //@ts-ignore
  data:IPagination<Survey>;




  constructor(
    private service:DirectorService,
    private educationService:EducationService,
    private armyRankService:ArmyRankService,
    private vtshService:VtshService,
    private positionService:PositionService,
    private stepService:StepService
  ) { }

  ngOnInit(): void {
    this.initializeData();
    this.initializeOtherData()
  }

  initializeData(){
    this.service.mySurveys(this.parameters).subscribe(
      response=>{
        //@ts-ignore
        this.data = response
      }
    )
  }


  initializeOtherData(){
    this.stepService.getAll(true).subscribe(
      response=>{
        this.steps = response.data;
      }
    );
    this.educationService.getAll(true).subscribe(
      response=>{
        this.educations = response.data;
      }
    );
    this.armyRankService.getAll(true).subscribe(
      response=>{
        this.armyRanks = response.data;
      }
    );
    this.vtshService.getAll(true).subscribe(
      response=>{
        this.vtsh = response.data;
      }
    );
    this.positionService.getAll(true).subscribe(
      response=>{
        this.position = response.data;
      }
    );
  }



  selectEducationEvent(item: Education) {
    if(item){
      this.parameters.educationId = item.id;
      this.initializeData();
    }
  }

  isClosedEducationAutoComplete() {
    this.parameters.educationId = null;
    this.initializeData();
  }

  selectArmyRankEvent(item: ArmyRank) {
    if(item){
      this.parameters.armyRankId = item.id;
      this.initializeData();
    }
  }

  isClosedArmyRankAutoComplete() {
    this.parameters.armyRankId = null;
    this.initializeData();
  }
  selectVtshEvent(item: Vtsh) {
    if(item){
      this.parameters.vTShId = item.id;
      this.initializeData();
    }
  }

  isClosedVtshAutoComplete() {
    this.parameters.vTShId = null;
    this.initializeData();
  }

  selectPositionEvent(item: Position) {
    if(item){
      this.parameters.positionId = item.id;
      this.initializeData();
    }
  }

  isClosedPositionAutoComplete() {
    this.parameters.positionId = null;
    this.initializeData();
  }
  selectStepEvent(item: Step) {
    if(item){
      this.parameters.stepId = item.id;
      this.initializeData();
    }
  }

  isClosedStepAutoComplete() {
    this.parameters.stepId = null;
    this.initializeData();
  }
  selectStatusEvent(item: any) {
    if(item){
      this.parameters.status = item.id;
      this.initializeData();
    }
  }
  isClosedStatusAutoComplete() {
    this.parameters.status = null;
    this.initializeData();
  }

  onSearch(){
    if(this.parameters.search != null && this.parameters.search?.length> 3){
      this.parameters.pageIndex = 1;
      this.initializeData();
    }
    else{
      this.initializeData();
    }
  }

  changePageSize(perPage:any){
    perPage = perPage.value;
    if(perPage != null && perPage > 0){
      this.parameters.pageIndex = 1;
      this.parameters.pageSize = perPage;
      this.initializeData();
    }
  }

  onPagerChange(event: any) {
    this.parameters.pageIndex = event;
    this.initializeData();
  }


}
