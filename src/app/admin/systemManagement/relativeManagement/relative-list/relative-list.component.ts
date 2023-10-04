import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {Education} from "../../../../shared/models/system/education";
import {EducationService} from "../../../../shared/services/education.service";
import {Relative} from "../../../../shared/models/system/relative";
import {RelativeService} from "../../../../shared/services/relative.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-relative-list',
  templateUrl: './relative-list.component.html',
  styleUrls: ['./relative-list.component.scss']
})
export class RelativeListComponent implements OnInit {
//@ts-ignore
  relative$:Observable<IResponse<Relative[]>>

  constructor(private relativeService:RelativeService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.relative$ = this.relativeService.getAll();
  }

  delete(id:number){
    this.relativeService.Delete(id).subscribe(
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
