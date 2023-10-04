import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {Relative} from "../../../../shared/models/system/relative";
import {RelativeService} from "../../../../shared/services/relative.service";
import {ActivatedRoute} from "@angular/router";
import {VtshService} from "../../../../shared/services/vtsh.service";
import {Vtsh} from "../../../../shared/models/system/vtsh";

@Component({
  selector: 'app-vtsh-single',
  templateUrl: './vtsh-single.component.html',
  styleUrls: ['./vtsh-single.component.scss']
})
export class VtshSingleComponent implements OnInit {


  //@ts-ignore
  vtsh$:Observable<IResponse<Vtsh>>
  //@ts-ignore
  id:number;
  constructor(private service:VtshService,
              private route: ActivatedRoute,) {

    this.route.params.subscribe(res => {this.id=res.id});

  }

  ngOnInit(): void {

    this.initializeData();
  }

  initializeData(){
    this.vtsh$ = this.service.getById(this.id);
  }

}
