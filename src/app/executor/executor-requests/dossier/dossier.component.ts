import { Component, OnInit } from '@angular/core';
import { faCheck,faTimes,faTimesCircle,faFile,faDownload  } from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from "@angular/router";
import {SurveyService} from "../../../shared/services/survey.service";
import {Observable} from "rxjs";
import {IResponse} from "../../../shared/models/common/response";
import {Survey} from "../../../shared/models/survey/survey";
import {SendConfirmation} from "../../../shared/models/profile/sendConfirmation";
import {ExecutorService} from "../../executor.service";
import {Toast, ToastrService} from "ngx-toastr";
import {Profile} from "../../../shared/models/profile/profile";
import {SendRequest} from "../../../shared/models/profile/sendRequest";
import {StepsConstant} from "../../../shared/constants/stepsConstant";
import {AppConfigService} from "../../../shared/services/app.config.service";

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss']
})
export class DossierComponent implements OnInit {
  baseFileUrl: string = '';
  faCheck = faCheck;
  faTimes = faTimes;
  faTimesCircle = faTimesCircle;
  faFile = faFile;
  faDownload = faDownload;
  tabClose: boolean = false;
  signed: boolean = false;
  //System Variable
  //@ts-ignore
  id: number;
  //@ts-ignore
  profileId: number;
  //RXJS
  //@ts-ignore
  survey$: Observable<IResponse<Survey>>;
  model: SendConfirmation = new SendConfirmation();
  request: SendRequest = new SendRequest();
  //@ts-ignore
  currentProfile: Profile;
  requestStep = StepsConstant.executorsRequestStep;
  confirmStep = StepsConstant.executorConfirmRStep;
  currentProfileId: number = 0;
  currentFile: string | null = "";

  constructor(private route: ActivatedRoute,
              private surveyService : SurveyService,
              private executorService: ExecutorService,
              private toaster: ToastrService,
              private appConfigService: AppConfigService
              ) {
    this.baseFileUrl = this.appConfigService.baseUrl;
    this.route.params.subscribe(res => {
      this.id = res.id;
      this.profileId = res.profileId
    });
  }

  ngOnInit(): void {
    if (this.signed) {
      this.tabClose = true;
    }
    this.initializeData();
  }


  initializeData(){
    this.survey$ = this.surveyService.getById(this.id);
  }

  closeTab():void{
    this.tabClose = !this.tabClose;
  }

  setCurrentProfile(profile:Profile){
    this.currentProfile = profile;
  }

  sendConfirmation(status:number){
    var prompts = confirm("Вы уверены что хотите выполнить текущее действие?");
    if(prompts == true){
      this.model.status = status;
      this.model.signKey = "test";
      this.executorService.postAcceptDocument(this.profileId, this.model).subscribe(
        (response: any) => {
          //this.initializeData();
          location.reload();

        },
        error => {
          if (error.errors) {
            this.toaster.error(error.errors.messages);
          }
        }
      );
    }
  }

  sendToRequest(stepId:number,surveyId:number,status:number){
    var prompts = confirm("Вы уверены что хотите выполнить текущее действие?");
    if(prompts == true){
      this.request.status = status;
      this.request.stepId = stepId;
      this.request.surveyId = surveyId;
      this.request.signKey = "test";
      this.executorService.postRequestDocument(this.request).subscribe(
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

  }

  getCurrentProfile(survey?:Survey){
    if(survey != null){
      if(survey.profiles != null){
        survey.profiles.forEach(item=>{
          if(item.stepId == survey.currentStepId){
            this.currentProfileId = item.id
          }
        });
      }
    }
    return this.currentProfileId;
  }

  selectCurrentFile(file:string|null){
    this.currentFile = file;
  }

}
