import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {JobCategory} from "../../../../shared/models/calculation/jobCategory";
import {JobCategoryService} from "../../../../shared/services/job-category.service";
import {Qualification} from "../../../../shared/models/calculation/qualification";
import {QualificationService} from "../../../../shared/services/qualification.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-qualification-list',
  templateUrl: './qualification-list.component.html',
  styleUrls: ['./qualification-list.component.scss']
})
export class QualificationListComponent implements OnInit {

  //@ts-ignore
  qualifications$:Observable<IResponse<Qualification[]>>

  constructor(private service:QualificationService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.qualifications$ = this.service.getAll();
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
