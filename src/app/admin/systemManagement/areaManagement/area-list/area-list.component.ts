import { Component, OnInit } from '@angular/core';
import {AreaService} from "../../../../shared/services/area.service";
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {Area} from "../../../../shared/models/system/area";
import {IPagination} from "../../../../shared/helpers/pagination";
import {AreaParameters} from "../../../../shared/parameters/areaParameters";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent implements OnInit {
  //@ts-ignore
  areaList$:Observable<IPagination<Area>>

  areaParameters = new AreaParameters();
  constructor(private areaService:AreaService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getDataWithSpec();
  }

  getDataWithSpec(){
    this.areaList$ = this.areaService.getAllWithParam(this.areaParameters);
  }

  onPagerChange(event: any) {
    this.areaParameters.pageIndex = event;
    this.getDataWithSpec();
  }

  delete(id:number){
    this.areaService.Delete(id).subscribe(
      response=>{
        this.toastr.success(response.message);
        this.getDataWithSpec();
      },
      error => {
        if(error.message){
          this.toastr.error(error.message);
        }
      }
    )
  }

}
