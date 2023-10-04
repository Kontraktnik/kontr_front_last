import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {Qualification} from "../../../../shared/models/calculation/qualification";
import {QualificationService} from "../../../../shared/services/qualification.service";
import {ActivatedRoute} from "@angular/router";
import {ServiceYear} from "../../../../shared/models/calculation/serviceYear";
import {ServiceYearService} from "../../../../shared/services/service-year.service";

@Component({
  selector: 'app-service-year-single',
  templateUrl: './service-year-single.component.html',
  styleUrls: ['./service-year-single.component.scss']
})
export class ServiceYearSingleComponent implements OnInit {

  //@ts-ignore
  model$:Observable<IResponse<ServiceYear>>
  //@ts-ignore
  id:number;
  constructor(private service:ServiceYearService,
              private route: ActivatedRoute,) {

    this.route.params.subscribe(res => {this.id=res.id});

  }

  ngOnInit(): void {

    this.initializeData();
  }

  initializeData(){
    this.model$ = this.service.getById(this.id);
  }

}
