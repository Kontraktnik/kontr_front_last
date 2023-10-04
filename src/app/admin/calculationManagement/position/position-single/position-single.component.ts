import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {PositionService} from "../../../../shared/services/position.service";
import {SecretLevelService} from "../../../../shared/services/secret-level.service";
import {IResponse} from "../../../../shared/models/common/response";
import {Position} from "../../../../shared/models/calculation/position/position";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-position-single',
  templateUrl: './position-single.component.html',
  styleUrls: ['./position-single.component.scss']
})
export class PositionSingleComponent implements OnInit {
//@ts-ignore
  id:number;
  //@ts-ignore
  position$:Observable<IResponse<Position>>;

  constructor( private service:PositionService,private route: ActivatedRoute) {
    this.route.params.subscribe(res => {this.id=res.id});
  }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.position$ = this.service.getById(this.id);
  }

}
