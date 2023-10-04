import {Component, Input, OnInit} from '@angular/core';
import {SurveyService} from "../../services/survey.service";
import {ToastrService} from "ngx-toastr";
import {AppConfigService} from "../../../shared/services/app.config.service";

@Component({
  selector: 'app-survey-report',
  templateUrl: './survey-report.component.html',
  styleUrls: ['./survey-report.component.scss']
})
export class SurveyReportComponent implements OnInit {

  @Input() SurveyId:number|undefined|null;
  clicked: boolean = false;
  error: string = '';
  fileUrl: string = '';
  link?: string;

  constructor(private service: SurveyService, private toastr: ToastrService, private appConfigService: AppConfigService) {
    this.fileUrl = this.appConfigService.baseUrl;
  }

  ngOnInit(): void {
  }

  getReport(){
    if(this.SurveyId){
      this.clicked = true;
      this.service.getReport(this.SurveyId??0).subscribe(
        res=>{
          if(res.success){
            this.link = res.data;
          }
          else{
            this.toastr.error("Что-то пошло не так");
          }
        },
        error => {
          this.toastr.error("Что-то пошло не так");
        }
      )
    }

  }

}
