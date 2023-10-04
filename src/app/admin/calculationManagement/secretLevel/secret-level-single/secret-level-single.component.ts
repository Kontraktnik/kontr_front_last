import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {Qualification} from "../../../../shared/models/calculation/qualification";
import {QualificationService} from "../../../../shared/services/qualification.service";
import {ActivatedRoute} from "@angular/router";
import {SecretLevel} from "../../../../shared/models/calculation/secretLevel";
import {SecretLevelService} from "../../../../shared/services/secret-level.service";

@Component({
  selector: 'app-secret-level-single',
  templateUrl: './secret-level-single.component.html',
  styleUrls: ['./secret-level-single.component.scss']
})
export class SecretLevelSingleComponent implements OnInit {

  //@ts-ignore
  model$:Observable<IResponse<SecretLevel>>
  //@ts-ignore
  id:number;
  constructor(private service:SecretLevelService,
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
