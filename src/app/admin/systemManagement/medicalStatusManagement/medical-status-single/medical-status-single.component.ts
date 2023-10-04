import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {DriverLicense} from "../../../../shared/models/system/driverLicense";
import {DriverLicenseService} from "../../../../shared/services/driver-license.service";
import {ActivatedRoute} from "@angular/router";
import {MedicalStatus} from "../../../../shared/models/system/medicalStatus";
import {MedicalStatusService} from "../../../../shared/services/medical-status.service";

@Component({
  selector: 'app-medical-status-single',
  templateUrl: './medical-status-single.component.html',
  styleUrls: ['./medical-status-single.component.scss']
})
export class MedicalStatusSingleComponent implements OnInit {

  //@ts-ignore
  medicalStatus$:Observable<IResponse<MedicalStatus>>
  //@ts-ignore
  id:number;
  constructor(private service:MedicalStatusService,
              private route: ActivatedRoute,) {

    this.route.params.subscribe(res => {this.id=res.id});

  }

  ngOnInit(): void {

    this.initializeData();
  }

  initializeData(){
    this.medicalStatus$ = this.service.getById(this.id);
  }

}
