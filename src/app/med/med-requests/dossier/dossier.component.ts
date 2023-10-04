import { Component, OnInit } from '@angular/core';
import { faCheck,faTimes,faTimesCircle,faFile,faDownload  } from '@fortawesome/free-solid-svg-icons';
import {Profile} from "../../../shared/models/profile/profile";
import {Observable} from "rxjs";
import {IResponse} from "../../../shared/models/common/response";
import {Survey} from "../../../shared/models/survey/survey";
import {SendConfirmation} from "../../../shared/models/profile/sendConfirmation";
import {ActivatedRoute} from "@angular/router";
import {SurveyService} from "../../../shared/services/survey.service";
import {ToastrService} from "ngx-toastr";
import {MedService} from "../../med.service";
import {MedicalStatus} from "../../../shared/models/system/medicalStatus";
import {MedicalStatusService} from "../../../shared/services/medical-status.service";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss']
})
export class DossierComponent implements OnInit {
  faCheck = faCheck;
  faTimes = faTimes;
  faTimesCircle = faTimesCircle;
  faFile = faFile;
  faDownload = faDownload;
  tabClose:boolean = false;
  signed: boolean = false;
  //@ts-ignore
  id:number;
  //@ts-ignore
  profileId:number;
  //RXJS
  //@ts-ignore
  currentProfile:Profile;
  //@ts-ignore
  survey$:Observable<IResponse<Survey>>;
  model:SendConfirmation = new SendConfirmation();
  currentFile:string|null = "";
  //@ts-ignore
  medicalStatuses:MedicalStatus[];
  constructor(private route: ActivatedRoute,
              private surveyService : SurveyService,
              private medService:MedService,
              private toaster:ToastrService,
              private medicalStatusService:MedicalStatusService
  ) {
    this.route.params.subscribe(res => {this.id=res.id;this.profileId = res.profileId});
  }

  ngOnInit(): void {
    this.initializeData();
  }

  closeTab():void{
    this.tabClose = !this.tabClose;
  }

  initializeData(){
    this.survey$ = this.surveyService.getById(this.id);
    this.getMedicalStatus();
  }

  setCurrentProfile(profile:Profile){
    this.currentProfile = profile;
  }

  sendMedConfirmation(status:number){
    console.log(this,this.model.medicalStatusId);
    if(this.model.medicalStatusId){
      this.model.status = status;
      this.model.signKey = "test";
      this.medService.postMedCheckProfile(this.profileId,this.model).subscribe(
        (response:any)=>{
          //this.initializeData();
          location.reload();
        },
        error => {
          if(error.errors){
            this.toaster.error(error.errors.messages);
          }
        }
      );
    }
    else{
      this.toaster.warning("Выберите категорию годности!")
    }

  }

  sendPsychoConfirmation(status:number){
    this.model.status = status;
    this.model.signKey = "test";
    this.medService.postCheckUserPsycho(this.profileId,this.model).subscribe(
      (response:any)=>{
        //this.initializeData();
        location.reload();
      },
      error => {
        if(error.errors){
          this.toaster.error(error.errors.messages);
        }
      }
    );
  }

  selectCurrentFile(file:string|null){
    this.currentFile = file;
  }

  getMedicalStatus(){
    this.medicalStatusService.getAll().subscribe(
      response=>{
        this.medicalStatuses = response.data;
      },
      error => {
        this.toaster.error(error.errors.messages);
      }
    )
  }

}
