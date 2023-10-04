import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {Education} from "../../../../shared/models/system/education";
import {EducationService} from "../../../../shared/services/education.service";
import {ActivatedRoute} from "@angular/router";
import {RelativeService} from "../../../../shared/services/relative.service";
import {Relative} from "../../../../shared/models/system/relative";

@Component({
  selector: 'app-relative-single',
  templateUrl: './relative-single.component.html',
  styleUrls: ['./relative-single.component.scss']
})
export class RelativeSingleComponent implements OnInit {

  //@ts-ignore
  relative$:Observable<IResponse<Relative>>
  //@ts-ignore
  id:number;
  constructor(private service:RelativeService,
              private route: ActivatedRoute,) {

    this.route.params.subscribe(res => {this.id=res.id});

  }

  ngOnInit(): void {

    this.initializeData();
  }

  initializeData(){
    this.relative$ = this.service.getById(this.id);
  }

}
