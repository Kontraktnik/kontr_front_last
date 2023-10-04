import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../../shared/models/common/response";
import {Qualification} from "../../../../shared/models/calculation/qualification";
import {QualificationService} from "../../../../shared/services/qualification.service";
import {SecretLevel} from "../../../../shared/models/calculation/secretLevel";
import {SecretLevelService} from "../../../../shared/services/secret-level.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-secret-level-list',
  templateUrl: './secret-level-list.component.html',
  styleUrls: ['./secret-level-list.component.scss']
})
export class SecretLevelListComponent implements OnInit {

  //@ts-ignore
  secretLevel$:Observable<IResponse<SecretLevel[]>>

  constructor(private service:SecretLevelService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.secretLevel$ = this.service.getAll();
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
