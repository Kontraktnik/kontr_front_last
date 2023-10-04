import {Component, OnInit} from '@angular/core';
import {faFileAlt, faFileImage, faFilePdf, faFileWord} from "@fortawesome/free-solid-svg-icons";
import {IUser} from "../../../shared/models/user/user";
import {Survey} from "../../../shared/models/survey/survey";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";
import {debounceTime, distinct, distinctUntilChanged, map, shareReplay} from "rxjs/operators";
import {UserService} from "../../user.service";
import {SurveyRelative} from "../../../shared/models/survey/surveyRelative";
import {SurveyDriver} from "../../../shared/models/survey/surveyDriver";
import {GlobalTranslateService} from "../../../shared/services/common/global-translate.service";
import {SurveyService} from "../../../shared/services/survey.service";


@Component({
  selector: 'app-open-request',
  templateUrl: './open-request.component.html',
  styleUrls: ['./open-request.component.scss']
})
export class OpenRequestComponent implements OnInit {
  faFilePdf = faFilePdf;
  faFileImage = faFileImage;
  faFileWord = faFileWord;
  faFileAlt = faFileAlt;
  //@ts-ignore
  currentUser: IUser
  //@ts-ignore
  survey:Survey
  surveyRelatives: SurveyRelative[] = []
  driverLicenses: SurveyDriver[] = []
  birthArea:string = ''
  currentFile:string = "";
  constructor(
    private userService: UserService,
    private surveyService:SurveyService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public translate: GlobalTranslateService) {
      this.authService.currentUser$.pipe(
        map(user => {
          return user.data
        }),
        distinct(),
        shareReplay()
      ).subscribe(res => this.currentUser = res)
  }

  ngOnInit(): void {
    this.translate.getCurrentLang()
    this.getSurveyById()
  }

  getSurveyById() {
    // @ts-ignore
    this.surveyService.getById(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(res => {
      this.survey = res.data
    })
  }

  getBirthArea(data:Survey|null):any {
    if (data != null) {
      let strData = {
        area: data.area?.titleRu != null ? data.area.titleRu : '',
        region: data.region != null ? data.region : '',
        city: data.city != null ? data.city : '',
        street: data.street != null ? data.street : '',
        home: data.home != null ? data.home : '',
        appartment: data.appartment != null ? ", "+data.appartment : '',
      }
      this.birthArea = strData.area + ', ' +
        strData.region + ', ' + strData.city + ', ' + strData.street + ', ' +
        strData.home + strData.appartment
    }
  }
  getDriverLicenses(data:SurveyDriver[]):string {
    let str:string = ""
    data.forEach(function (val) {
      if (val.driverLicense) {
        return str += val.driverLicense?.titleRu + ","
      } else {
        return str
      }
    })
    str = str.slice(0,-1)
    return str
  }

  setCurrentFile(file:string|null|undefined){
    if(file){
      this.currentFile = file;
    }
  }

}
