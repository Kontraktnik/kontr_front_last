import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IPagination} from "../../../shared/helpers/pagination";
import {Profile} from "../../../shared/models/profile/profile";
import {ExecutorService} from "../../executor.service";
import {ProfileExecutorParameters} from "../../profileExecutorParameters";

@Component({
  selector: 'app-rejected-requests',
  templateUrl: './rejected-requests.component.html',
  styleUrls: ['./rejected-requests.component.scss']
})
export class RejectedRequestsComponent implements OnInit {
//@ts-ignore
  //@ts-ignore
  data:IPagination<Profile>;
  parameters:ProfileExecutorParameters = new ProfileExecutorParameters();

  constructor(private executorService:ExecutorService) {
  }

  ngOnInit(): void {
    this.initializeData();

  }

  initializeData(){
    this.executorService.getRejected(this.parameters).subscribe(
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
