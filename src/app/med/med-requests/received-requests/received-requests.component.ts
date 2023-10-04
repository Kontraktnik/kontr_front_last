import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IPagination} from "../../../shared/helpers/pagination";
import {Profile} from "../../../shared/models/profile/profile";
import {MedService} from "../../med.service";
import {ProfileKnbParameters} from "../../../knb/profileKnbParameters";

@Component({
  selector: 'app-received-requests',
  templateUrl: './received-requests.component.html',
  styleUrls: ['./received-requests.component.scss']
})
export class ReceivedRequestsComponent implements OnInit {

//@ts-ignore
  data:IPagination<Profile>;
  parameters:ProfileKnbParameters = new ProfileKnbParameters();
  constructor(private medService:MedService) {

  }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.medService.getSended(this.parameters).subscribe(
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
