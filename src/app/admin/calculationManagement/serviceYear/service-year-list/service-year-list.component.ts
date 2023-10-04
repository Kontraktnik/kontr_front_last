import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {Qualification} from "../../../../shared/models/calculation/qualification";
import {QualificationService} from "../../../../shared/services/qualification.service";
import {ServiceYear} from "../../../../shared/models/calculation/serviceYear";
import {ServiceYearService} from "../../../../shared/services/service-year.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-service-year-list',
  templateUrl: './service-year-list.component.html',
  styleUrls: ['./service-year-list.component.scss']
})
export class ServiceYearListComponent implements OnInit {

  //@ts-ignore
  serviceYear$:Observable<IResponse<ServiceYear[]>>

  constructor(private service:ServiceYearService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.serviceYear$ = this.service.getAll();
  }
  delete(id:number){
    this.service.Delete(id).subscribe(
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
