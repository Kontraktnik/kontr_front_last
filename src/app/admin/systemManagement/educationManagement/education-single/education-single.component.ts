import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {DriverLicense} from "../../../../shared/models/system/driverLicense";
import {DriverLicenseService} from "../../../../shared/services/driver-license.service";
import {ActivatedRoute} from "@angular/router";
import {Education} from "../../../../shared/models/system/education";
import {EducationService} from "../../../../shared/services/education.service";

@Component({
  selector: 'app-education-single',
  templateUrl: './education-single.component.html',
  styleUrls: ['./education-single.component.scss']
})
export class EducationSingleComponent implements OnInit {

  //@ts-ignore
  education$:Observable<IResponse<Education>>
  //@ts-ignore
  id:number;
  constructor(private service:EducationService,
              private route: ActivatedRoute,) {

    this.route.params.subscribe(res => {this.id=res.id});

  }

  ngOnInit(): void {

    this.initializeData();
  }

  initializeData(){
    this.education$ = this.service.getById(this.id);
  }

}
