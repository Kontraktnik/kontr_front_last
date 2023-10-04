import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {ArmyRegion} from "../../../../shared/models/system/armyRegion";
import {ArmyRegionService} from "../../../../shared/services/army-region.service";
import {DriverLicense} from "../../../../shared/models/system/driverLicense";
import {DriverLicenseService} from "../../../../shared/services/driver-license.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-driver-license-list',
  templateUrl: './driver-license-list.component.html',
  styleUrls: ['./driver-license-list.component.scss']
})
export class DriverLicenseListComponent implements OnInit {
//@ts-ignore
  driverLicense$:Observable<IResponse<DriverLicense[]>>

  constructor(private driverLicense:DriverLicenseService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.driverLicense$ = this.driverLicense.getAll();
  }
  delete(id:number){
    this.driverLicense.Delete(id).subscribe(
      response=>{
        this.toastr.success(response.message);
        this.initializeData();
      },
      error => {
        if(error.message){
          this.toastr.error(error.message);
        }
      }
    )
  }
}
