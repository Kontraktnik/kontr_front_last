import { Component, OnInit } from '@angular/core';
import {IPagination} from "../../../shared/helpers/pagination";
import {Profile} from "../../../shared/models/profile/profile";
import {ExecutorService} from "../../executor.service";
import {ProfileExecutorParameters} from "../../profileExecutorParameters";

@Component({
  selector: 'app-inspected-requests',
  templateUrl: './inspected-requests.component.html',
  styleUrls: ['./inspected-requests.component.scss']
})
export class InspectedRequestsComponent implements OnInit {
//@ts-ignore
  data:IPagination<Profile>;
  parameters:ProfileExecutorParameters = new ProfileExecutorParameters();

  constructor(private executorService:ExecutorService) {
  }

  ngOnInit(): void {
    this.initializeData();

  }

  initializeData(){
    this.executorService.getSpecialCheck(this.parameters).subscribe(
      response=>{
        //@ts-ignore
        this.data = response;
      }
    );
  }

  onPagerChange(event: any) {
    this.parameters.pageIndex = event;
    this.initializeData();
  }

  selectRequestedStatus(status:number|null){
    if(status == null){
      this.parameters.requestedStatus = [];
    }
    else{
      var item = this.parameters.requestedStatus.indexOf(status);
      if(item == -1){
        this.parameters.requestedStatus.push(status);
      }
      else{
        this.parameters.requestedStatus.splice(item, 1);
      }
    }
    this.initializeData();

  }

}
