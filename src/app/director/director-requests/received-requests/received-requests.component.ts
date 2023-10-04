import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IPagination} from "../../../shared/helpers/pagination";
import {Profile} from "../../../shared/models/profile/profile";
import {DirectorService} from "../../director.service";
import {IUser} from "../../../shared/models/user/user";
import {SurveyExecutorCreate} from "../../../shared/models/survey/surveyExecutorCreate";
import {IResponse} from "../../../shared/models/common/response";
import {AuthService} from "../../../auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {DirectorReceivedParameters} from "./directorReceivedParameters";

@Component({
  selector: 'app-received-requests',
  templateUrl: './received-requests.component.html',
  styleUrls: ['./received-requests.component.scss']
})
export class ReceivedRequestsComponent implements OnInit {
//@ts-ignore
  data:IPagination<Profile>;
  //@ts-ignore
  users:IUser[];
  //@ts-ignore
  currentUser: IUser;
  parameters:DirectorReceivedParameters = new DirectorReceivedParameters();
  executors:{[key: number]: SurveyExecutorCreate} = {};

  constructor(private directorService:DirectorService,private authService: AuthService, private toastr:ToastrService) {
  }

  ngOnInit(): void {
      this.getCurrentUser();
      this.getSended();
      this.getExecutors();
  }



  getSended(){
    this.directorService.getSended(this.parameters).subscribe(
      response=>{
        //@ts-ignore
        this.data = response
      },error => {

      }
    )
  }

  getExecutors(){
    this.directorService.getExecutors().subscribe(
      res=>{
        this.users = res;
      }
    );
  }

  addExecutor(surveyId:number, executorId:any){
    executorId = executorId.value;
    if(executorId > 0){
      this.executors[surveyId] = new SurveyExecutorCreate(surveyId,executorId,this.currentUser.id);
    }
    else{
      if(this.executors.hasOwnProperty(surveyId)){
        delete this.executors[surveyId];
      }
    }
  }

  getCurrentUser(){
    this.authService.currentUser$.subscribe(
      (response)=>{
        this.currentUser = response.data;
      },
      error => {
      }
    )
  }

  confirmSendedDocument(surveyId:number,profileId:number){
    if(this.executors.hasOwnProperty(surveyId)){
      this.directorService.postConfirmSendedDocument(profileId,this.currentUser.iin,this.executors[surveyId])
        .subscribe(
          response=>{
            this.toastr.success(response.message??"Success");
            this.getSended();
            location.reload();
          },error => {
            this.toastr.error("Роль распределена");
          }
        );
    }
  }

  onPagerChange(event: any) {
    this.parameters.pageIndex = event;
    this.getSended();
  }

  getAreaExecutor(areaId:number){
    // @ts-ignore
    return this.users.filter(item=>{
      if(item.areaId == areaId){
        return item;
      }
    });
  }

}
