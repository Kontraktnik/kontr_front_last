import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../shared/models/common/response";
import {Survey} from "../../../shared/models/survey/survey";
import {SendConfirmation} from "../../../shared/models/profile/sendConfirmation";
import {SendRequest} from "../../../shared/models/profile/sendRequest";
import {Profile} from "../../../shared/models/profile/profile";
import {StepsConstant} from "../../../shared/constants/stepsConstant";
import {ActivatedRoute} from "@angular/router";
import {SurveyService} from "../../../shared/services/survey.service";
import {ToastrService} from "ngx-toastr";
import {DirectorService} from "../../director.service";
import { faCheck,faTimes,faTimesCircle,faFile,faDownload  } from '@fortawesome/free-solid-svg-icons';

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
  survey$:Observable<IResponse<Survey>>;
  model:SendConfirmation = new SendConfirmation();
  request:SendRequest = new SendRequest();
  //@ts-ignore
  currentProfile:Profile;
  requestStep = StepsConstant.executorsRequestStep;
  confirmStep = StepsConstant.executorConfirmRStep;

  currentFile:string|null = "";

  constructor(private route: ActivatedRoute,
              private surveyService : SurveyService,
              private directorService:DirectorService,
              private toaster:ToastrService
  ) {
    this.route.params.subscribe(res => {this.id=res.id;this.profileId = res.profileId});
  }

  ngOnInit(): void {
    if(this.signed){this.tabClose = true;}
    this.initializeData();
  }


  initializeData(){
    this.survey$ = this.surveyService.getById(this.id);
  }



  setCurrentProfile(profile:Profile){
    this.currentProfile = profile;
  }

  sendConfirmation(status:number){
    var prompts = confirm("Вы уверены что хотите выполнить текущее действие?");
    if(prompts){
      this.model.status = status;
      this.model.signKey = "test";
      this.directorService.postSignUser(this.profileId,this.model).subscribe(
        (response:any)=>{
          if(response.message){
            this.toaster.success(response?.message);
          }
          this.initializeData();
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

  closeTab():void{
    this.tabClose = !this.tabClose;
  }

  selectCurrentFile(file:string|null){
    this.currentFile = file;
  }

}
