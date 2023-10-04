import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Position} from "../../shared/models/calculation/position/position";
import {ArmyRank} from "../../shared/models/system/armyRank";
import {ServiceYear} from "../../shared/models/calculation/serviceYear";
import {PositionService} from "../../shared/services/position.service";
import {ArmyRankService} from "../../shared/services/army-rank.service";
import {ServiceYearService} from "../../shared/services/service-year.service";
import {IResponse} from "../../shared/models/common/response";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Qualification} from "../../shared/models/calculation/qualification";
import {QualificationService} from "../../shared/services/qualification.service";
import {Calculation} from "../../shared/models/calculation/calculation";
import {CalculationServiceService} from "../../shared/services/calculation-service.service";
import * as signalR from "@microsoft/signalr"
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  //@ts-ignore
  positions$: Observable<IResponse<Position[]>>;
  //@ts-ignore
  armyRanks$: Observable<IResponse<ArmyRank[]>>;
  //@ts-ignore
  serviceYears$: Observable<IResponse<ServiceYear[]>>;
  //@ts-ignore
  qualifications$: Observable<IResponse<Qualification[]>>;
  //@ts-ignore
  calculationForm: FormGroup;
  //@ts-ignore
  calculationResult$:Observable<IResponse<number>>;
  constructor(
    private positionService:PositionService,
    private armyRankService:ArmyRankService,
    private serviceYearService:ServiceYearService,
    private qualificationService:QualificationService,
    private calculationService:CalculationServiceService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getArmyRanks();
    this.getPositions();
    this.getServiceYears();
    this.getQualifications();
    
  }

  getArmyRanks(){
    this.armyRanks$ = this.armyRankService.getAll(true);
  }

  getPositions(){
    this.positions$ = this.positionService.getAll(true);
  }
  getServiceYears(){
    this.serviceYears$ = this.serviceYearService.getAll(true);
  }

  getQualifications(){
    this.qualifications$ = this.qualificationService.getAll(true);
  }

  initializeForm(){
    this.calculationForm = new FormGroup({
        positionId:new FormControl("",Validators.required),
        armyRankId:new FormControl("",Validators.required),
        serviceYearId:new FormControl("",Validators.required),
        qualificationId:new FormControl("",Validators.required)
      }
    )
  }

  calculate(){
    if(this.calculationForm.valid){
      this.calculationResult$ = this.calculationService.calculateSalary(this.calculationForm.getRawValue() as Calculation)
    }
  }








}
