import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IUser} from "../../../shared/models/user/user";
import {Education} from "../../../shared/models/system/education";
import {ArmyRank} from "../../../shared/models/system/armyRank";
import {Vtsh} from "../../../shared/models/system/vtsh";
import {Position} from "../../../shared/models/calculation/position/position";
import {DirectorService} from "../../director.service";
import {EducationService} from "../../../shared/services/education.service";
import {ArmyRankService} from "../../../shared/services/army-rank.service";
import {VtshService} from "../../../shared/services/vtsh.service";
import {PositionService} from "../../../shared/services/position.service";
import {StatisticParameters} from "./statisticParameters";
import {Step} from "../../../shared/models/step/step";
import {StepService} from "../../../shared/services/step.service";
import {SurveyStats} from "../../../shared/models/survey/SurveyStats";
import {jsPDF} from "jspdf";
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  executors:IUser[] = [];
  educations:Education[] = [];
  armyRanks:ArmyRank[] = [];
  vtsh:Vtsh[] = [];
  position:Position[] = [];
  parameters:StatisticParameters = new StatisticParameters();
  steps:Step[] = [];
  keyword:string = "titleRu";

  //@ts-ignore
  data:SurveyStats;

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

  public exportToPdf() {
    let div = this.pdfTable.nativeElement;

    var img:any;
    var filename;
    var newImage:any;


    domtoimage.toPng(div, { bgcolor: '#fff' })
      .then(function(dataUrl) {
        img = new Image();
        img.src = dataUrl;
        newImage = img.src;
        img.onload = function(){
          var pdfWidth = img.width;
          var pdfHeight = img.height;
          // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image
          var doc;
          if(pdfWidth > pdfHeight)
          {
            doc = new jsPDF('l', 'px', [pdfWidth , pdfHeight]);
          }
          else
          {
            doc = new jsPDF('p', 'px', [pdfWidth , pdfHeight]);
          }
          var width = doc.internal.pageSize.getWidth();
          var height = doc.internal.pageSize.getHeight();
          doc.addImage(newImage, 'PNG',  10, 10, width, height);
          filename = 'mypdf_' + '.pdf';
          doc.save(filename);
        };
      })
      .catch(function(error:any) {
        return error
        // Error Handling
      });
  }

  initializeData(){
    this.service.getStats(this.parameters).subscribe(
      response=>{
        //@ts-ignore
        this.data = response?.data
      }
    )
  }

  initializeOtherData(){
    this.stepService.getAll(true).subscribe(
      response=>{
        this.steps = response.data;
      }
    );
    this.service.getExecutors().subscribe(
      response=>{
        this.executors = response;
      }
    )
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

  selectExecutorEvent(item: IUser) {
    if(item){
      this.parameters.executorId = item.id;
      this.initializeData();
    }
  }

  isClosedExecutorAutoComplete() {
    this.parameters.executorId = null;
    this.initializeData();
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

  countByStep(step:number){
    let total = 0;
    if(this.data){
      for(let statItem of this.data.byStepId){
        if(statItem.stepId == step){
          total += statItem.count
        }
      }
    }
    return total;
  }

  countByStepStats(step:number,status:number){
    let total = 0;
    if(this.data){
      for(let statItem of this.data.byStepId){
        if(statItem.stepId == step && statItem.status == status){
          total = statItem.count
        }
      }
    }
    return total;
  }

  countAllStepStats(status:number){
    let total = 0;
    if(this.data){
      for(let statItem of this.data.all){
        if(statItem.status == status){
          total = statItem.count
        }
      }
    }
    return total;
  }


}
