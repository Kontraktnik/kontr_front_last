import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IPagination} from "../../../shared/helpers/pagination";
import {Profile} from "../../../shared/models/profile/profile";
import {ExecutorService} from "../../executor.service";
import {ProfileExecutorParameters} from "../../profileExecutorParameters";

@Component({
  selector: 'app-received-requests',
  templateUrl: './received-requests.component.html',
  styleUrls: ['./received-requests.component.scss']
})
export class ReceivedRequestsComponent implements OnInit {
  //@ts-ignore
  data:IPagination<Profile>;
  parameters:ProfileExecutorParameters = new ProfileExecutorParameters();
  constructor(private executorService:ExecutorService) {

  }
  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.executorService.getSended(this.parameters).subscribe(
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
