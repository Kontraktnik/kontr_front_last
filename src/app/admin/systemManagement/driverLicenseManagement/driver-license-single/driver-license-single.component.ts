import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {ArmyRegion} from "../../../../shared/models/system/armyRegion";
import {ArmyRegionService} from "../../../../shared/services/army-region.service";
import {ActivatedRoute} from "@angular/router";
import {DriverLicense} from "../../../../shared/models/system/driverLicense";
import {DriverLicenseService} from "../../../../shared/services/driver-license.service";

@Component({
  selector: 'app-driver-license-single',
  templateUrl: './driver-license-single.component.html',
  styleUrls: ['./driver-license-single.component.scss']
})
export class DriverLicenseSingleComponent implements OnInit {

  //@ts-ignore
  driverLicense$:Observable<IResponse<DriverLicense>>
  //@ts-ignore
  id:number;
  constructor(private driverLicenseService:DriverLicenseService,
              private route: ActivatedRoute,) {

    this.route.params.subscribe(res => {this.id=res.id});

  }

  ngOnInit(): void {

    this.initializeData();
  }

  initializeData(){
    this.driverLicense$ = this.driverLicenseService.getById(this.id);
  }

}
