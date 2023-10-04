import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {Education} from "../../../../shared/models/system/education";
import {EducationService} from "../../../../shared/services/education.service";
import {VtshService} from "../../../../shared/services/vtsh.service";
import {Vtsh} from "../../../../shared/models/system/vtsh";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-vtsh-list',
  templateUrl: './vtsh-list.component.html',
  styleUrls: ['./vtsh-list.component.scss']
})
export class VtshListComponent implements OnInit {

  //@ts-ignore
  vtsh$:Observable<IResponse<Vtsh[]>>

  constructor(private vtshService:VtshService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.vtsh$ = this.vtshService.getAll();
  }

  delete(id:number){
    this.vtshService.Delete(id).subscribe(
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
