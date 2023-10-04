import {Component, OnInit} from '@angular/core';
import {UserService} from "../../user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Survey} from "../../../shared/models/survey/survey";
import {Profile} from "../../../shared/models/profile/profile";
import {Roles} from "../../../shared/constants/roles";
import {ToastrService} from "ngx-toastr";
import {SurveyService} from "../../../shared/services/survey.service";
import {StepsConstant} from "../../../shared/constants/stepsConstant";
import { faCheck,faTimes,faTimesCircle,faFile,faDownload, faInfoCircle, faComment,faFilePdf } from '@fortawesome/free-solid-svg-icons';
import {GlobalTranslateService} from "../../../shared/services/common/global-translate.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UploadFileService} from "../../../shared/services/common/upload-file.service";
import {SurveyMed} from "../../../shared/models/survey/surveyMed";

@Component({
  selector: 'app-show-request',
  templateUrl: './show-request.component.html',
  styleUrls: ['./show-request.component.scss']
})
export class ShowRequestComponent implements OnInit {
  mySurvey!: Survey
  Roles = Roles
  StepConstant = StepsConstant;
  //@ts-ignore
  currentProfile:Profile;
  //@ts-ignore
  activeProfile:Profile;
  faCheck = faCheck;
  faCircleInfo = faInfoCircle;
  faComment = faComment;
  faTimes = faTimes;
  faTimesCircle = faTimesCircle;
  faFile = faFile;
  faDownload = faDownload;
  //@ts-ignore
  medForm:FormGroup;
  formData: FormData = new FormData();


  constructor(private userService: UserService,
              private surveyService:SurveyService,
              private activatedRoute: ActivatedRoute,
              private toasterService: ToastrService,
              private router: Router,
              public translate: GlobalTranslateService,
              private uploadFile: UploadFileService,
              ) { }

  ngOnInit(): void {
    this.translate.getCurrentLang()
    this.getMySurveyById();
    this.initializeForm();
  }

  getMySurveyById() {
    // @ts-ignore
    this.surveyService.getById(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      res=>{
        this.mySurvey = res.data
      }
    )
  }

  passMed(profId: number,status:number = 1) {
    if(status == 1){
      if(this.medForm.valid){
        this.surveyService.Update(this.mySurvey.id,this.medForm.getRawValue() as SurveyMed).subscribe(
          res=>{
            this.userService.passMed(profId,status).subscribe(res => {
              if (res.success) {
                this.toasterService.success(res.message??"Успешно отправлено")
                this.getMySurveyById()
              }
            });
          },
          error => {
            this.toasterService.error(error.message)
          }
        )
      }
      else{
        this.toasterService.warning("Загрузите все файлы для подачи заявки")
      }
    }
    if(status == -1){
        if(!confirm("Вы уверены?")) {
          return;
        }
      this.userService.passMed(profId,status).subscribe(res => {
        if (res.success) {
          this.toasterService.success(res.message??"Выполнено")
          this.getMySurveyById()
        }
      });
    }


  }

  passPsychoTest(profId: number,status:number = 1) {
    if(status == -1){
      if(!confirm("Вы уверены?")) {
        return;
      }
    }
    this.userService.passPsychoTest(profId,status).subscribe(res => {
      if (res.success) {
        this.toasterService.success(res.message??"Успешно отправлено")
        this.getMySurveyById()
      }
    })
  }

  signOffer(profId: number,status:number = 1) {
    if(status == -1){
      if(!confirm("Вы уверены?")) {
        return;
      }
    }
    this.userService.signOffer(profId,status).subscribe(res => {
      if (res.success) {
        this.toasterService.success(res.message??"Успешно отправлено")
        this.getMySurveyById()
      }
    })
  }

  // @ts-ignore
  setStepClass(data:Survey, step: number) {
    if (data != null && data.stepGroupId != null) {
      if (data.stepGroupId > step) {
        return "my-arrow-success"
      }
      if (data.stepGroupId == step) {
        switch (data.status) {
          case 0: {
            return ""
          }
          case 1: {
            return "my-arrow-success"
          }
          case -1: {
            return "my-arrow-fail"
          }
          default: {
            return ""
          }
        }
      }
    } else {
      return ""
    }
  }

  //@ts-ignore
  setStepLineClass(data:Survey, step: number) {
    if (data != null && data.stepGroupId != null) {
      if (data.stepGroupId > step) {
        return "step-item-success"
      }
      if (data.stepGroupId == step) {
        switch (data.status) {
          case 0: {
            return ""
          }
          case 1: {
            return "step-item-success"
          }
          case -1: {
            return "step-item-fail"
          }
          default: {
            return ""
          }
        }
      }
      if (data.stepGroupId != step && data.stepGroupId < step) {
        return "invisible"
      }
    } else {
      return ""
    }
  }

  //@ts-ignore
  setStepData(data:Profile[]|null, step:number) {
    let prof
    if (data != null) {
      data = data.filter(val => val.stepGroupId == step)
      prof = data.pop()
      if (prof) {
        return prof.createdAt
      }
    }
  }

  sendSavedRequest(surveyId:number){
    if(surveyId != null){
      this.surveyService.SendSavedRequest(surveyId,this.mySurvey.iin).subscribe(
        response=>{
          this.getMySurveyById();
        },
        error => {
          this.toasterService.error("Что-то пошло не так")
        }
      )
    }
  }

  deleteRequest(Id:number){
    if(Id){
      this.surveyService.deleteById(Id).subscribe(
        response=>{
            this.router.navigateByUrl("/user/all-request");
        },
        error => {
          this.toasterService.error("Что-то пошло не так")
        }
      )
    }
  }

  setCurrentProfile(profile:Profile){
    this.currentProfile = profile;
  }

  selectActiveProfile(profile:Profile){
    this.activeProfile = profile;
  }


  initializeForm(){
    this.medForm = new FormGroup({
      tuberUrl:new FormControl("test.pdf",[Validators.required]),
      dermatologUrl:new FormControl("test.pdf",[Validators.required]),
      psychoNeurologicalUrl:new FormControl("test.pdf",[Validators.required]),
      narcologicalUrl:new FormControl("test.pdf",[Validators.required])
    });
  }


  // FILE METHODS
  onFileChange(event: any, type: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData.append('formFile', file, file.name)
      if (type == "tuberUrl") {
        this.uploadFile.saveFile(this.formData).subscribe(res => {
          this.medForm.controls["tuberUrl"].setValue(res);
        })
      }
      if (type == "dermatologUrl") {
        this.uploadFile.saveFile(this.formData).subscribe(res => {
          this.medForm.controls["dermatologUrl"].setValue(res);
        })
      }
      if (type == "psychoNeurologicalUrl") {
        this.uploadFile.saveFile(this.formData).subscribe(res => {
          this.medForm.controls["psychoNeurologicalUrl"].setValue(res);
        })
      }
      if (type == "narcologicalUrl") {
        this.uploadFile.saveFile(this.formData).subscribe(res => {
          this.medForm.controls["narcologicalUrl"].setValue(res);
        })
      }

      this.formData = new FormData();
    }
  }
  onDeleteFileChange(type: string) {
    if (type == "tuberUrl") {
      this.medForm.controls["tuberUrl"].setValue(null);
    }
    if (type == "dermatologUrl") {
      this.medForm.controls["dermatologUrl"].setValue(null);

    }
    if (type == "psychoNeurologicalUrl") {
      this.medForm.controls["psychoNeurologicalUrl"].setValue(null);
    }
    if (type == "narcologicalUrl") {
      this.medForm.controls["narcologicalUrl"].setValue(null);

    }
  }
//END FILE METHODS



}
