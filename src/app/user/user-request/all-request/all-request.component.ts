import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../user.service";
import {UserParameters} from "../../../shared/parameters/userParameters";
import {Survey} from "../../../shared/models/survey/survey";
import {StepsConstant} from "../../../shared/constants/stepsConstant";
import {Profile} from "../../../shared/models/profile/profile";
import {GlobalTranslateService} from "../../../shared/services/common/global-translate.service";

@Component({
  selector: 'app-all-request',
  templateUrl: './all-request.component.html',
  styleUrls: ['./all-request.component.scss']
})
export class AllRequestComponent implements OnInit {
  @Input() totalCount?: number;
  @Input() pageSize?: number;
  @Input() pageIndex?: number;
  //@ts-ignore
  userParams: UserParameters
  mySurveys: Survey[] = []
  StepConstant = StepsConstant;


  constructor(private userService: UserService, public translate: GlobalTranslateService) {
    this.userParams = userService.getUserParams()
  }

  ngOnInit(): void {
    this.translate.getCurrentLang()
    this.getMySurveys()
  }

  getMySurveys() {
    this.userService.getMySurveys().subscribe(response => {
      this.mySurveys = response.data
      this.totalCount = response.count
      this.pageIndex = response.pageIndex
      this.pageSize = response.pageSize
    }, error => {
      console.log(error)
    })
  }

  onPagerChange(event: any) {
    const params = this.userService.getUserParams();
    if (params.pageIndex !== event) {
      params.pageIndex = event;
      this.userService.setVacancyParams(params);
      this.getMySurveys();
    }
  }

  getActiveProfile(survey:Survey):Profile|null{
    if(survey){
      if(survey.profiles?.length != 0){
        var result = survey.profiles?.find(item=>item.stepId == survey.currentStepId);
        return result != null ? result : null;
      }
    }
    return null;
  }
}
