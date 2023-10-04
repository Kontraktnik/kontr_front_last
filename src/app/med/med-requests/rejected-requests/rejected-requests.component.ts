import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IPagination} from "../../../shared/helpers/pagination";
import {Profile} from "../../../shared/models/profile/profile";
import {KnbService} from "../../../knb/knb.service";
import {MedService} from "../../med.service";
import {ProfileKnbParameters} from "../../../knb/profileKnbParameters";

@Component({
  selector: 'app-rejected-requests',
  templateUrl: './rejected-requests.component.html',
  styleUrls: ['./rejected-requests.component.scss']
})
export class RejectedRequestsComponent implements OnInit {

  //@ts-ignore
  data:IPagination<Profile>;
  parameters:ProfileKnbParameters = new ProfileKnbParameters();
  constructor(private medService:MedService) {

  }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.medService.getRejected(this.parameters).subscribe(
      response=>{
        //@ts-ignore
        this.data = response;
      }
    )
  }

  onPagerChange(event: any) {
    this.parameters.pageIndex = event;
    this.initializeData();
  }

}
