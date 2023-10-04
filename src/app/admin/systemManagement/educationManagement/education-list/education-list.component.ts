import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {DriverLicense} from "../../../../shared/models/system/driverLicense";
import {DriverLicenseService} from "../../../../shared/services/driver-license.service";
import {Education} from "../../../../shared/models/system/education";
import {EducationService} from "../../../../shared/services/education.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-education-list',
  templateUrl: './education-list.component.html',
  styleUrls: ['./education-list.component.scss']
})
export class EducationListComponent implements OnInit {
//@ts-ignore
  education$:Observable<IResponse<Education[]>>

  constructor(private educationService:EducationService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.education$ = this.educationService.getAll();
  }
  delete(id:number){
    this.educationService.Delete(id).subscribe(
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
