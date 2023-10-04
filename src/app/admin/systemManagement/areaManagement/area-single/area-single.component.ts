import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {AreaService} from "../../../../shared/services/area.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-area-single',
  templateUrl: './area-single.component.html',
  styleUrls: ['./area-single.component.scss']
})
export class AreaSingleComponent implements OnInit {
  //@ts-ignore
  area$:Observable<IResponse<Area>>
  //@ts-ignore
  id:number;
  constructor(private areaService:AreaService,
              private route: ActivatedRoute,) {

    this.route.params.subscribe(res => {this.id=res.id});

  }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.area$ = this.areaService.getById(this.id);
  }

}
