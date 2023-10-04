import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {Education} from "../../../../shared/models/system/education";
import {EducationService} from "../../../../shared/services/education.service";
import {MedicalStatus} from "../../../../shared/models/system/medicalStatus";
import {MedicalStatusService} from "../../../../shared/services/medical-status.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-medical-status-list',
  templateUrl: './medical-status-list.component.html',
  styleUrls: ['./medical-status-list.component.scss']
})
export class MedicalStatusListComponent implements OnInit {

  //@ts-ignore
  medicalStatus$:Observable<IResponse<MedicalStatus[]>>

  constructor(private medicalStatusService:MedicalStatusService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.medicalStatus$ = this.medicalStatusService.getAll();
  }

  delete(id:number){
    this.medicalStatusService.Delete(id).subscribe(
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
