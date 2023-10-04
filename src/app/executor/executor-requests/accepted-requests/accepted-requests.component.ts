import { Component, OnInit } from '@angular/core';
import {ExecutorService} from "../../executor.service";
import {IPagination} from "../../../shared/helpers/pagination";
import {Profile} from "../../../shared/models/profile/profile";
import {ProfileExecutorParameters} from "../../profileExecutorParameters";

@Component({
  selector: 'app-accepted-requests',
  templateUrl: './accepted-requests.component.html',
  styleUrls: ['./accepted-requests.component.scss']
})
export class AcceptedRequestsComponent implements OnInit {
//@ts-ignore
  data:IPagination<Profile>;
  parameters:ProfileExecutorParameters = new ProfileExecutorParameters();

  constructor(private executorService:ExecutorService) {
    this.initializeData();
  }

  ngOnInit(): void {

  }

  initializeData(){
    this.executorService.getAccepted(this.parameters).subscribe(
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

}
