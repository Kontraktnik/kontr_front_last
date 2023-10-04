import { Component, OnInit } from '@angular/core';
import { faCheck,faTimes,faTimesCircle,faFile,faDownload  } from '@fortawesome/free-solid-svg-icons';
import {KnbService} from "../../knb.service";
import {ActivatedRoute} from "@angular/router";
import {SurveyService} from "../../../shared/services/survey.service";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {IResponse} from "../../../shared/models/common/response";
import {Survey} from "../../../shared/models/survey/survey";
import {SendConfirmation} from "../../../shared/models/profile/sendConfirmation";
import {Profile} from "../../../shared/models/profile/profile";

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
  //Ui End
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

  constructor(private route: ActivatedRoute,
              private surveyService : SurveyService,
              private knbService:KnbService,
              private toaster:ToastrService
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
  }

  setCurrentProfile(profile:Profile){
    this.currentProfile = profile;
  }

  sendConfirmation(status:number){
    this.model.status = status;
    this.model.signKey = "test";
    this.knbService.postSpecialCheckDocuments(this.profileId,this.model).subscribe(
      (response:any)=>{
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


}
