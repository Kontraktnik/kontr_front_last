import { Component, OnInit } from '@angular/core';
import {IPagination} from "../../../shared/helpers/pagination";
import {Profile} from "../../../shared/models/profile/profile";
import {ProfileKnbParameters} from "../../../knb/profileKnbParameters";
import {MedService} from "../../med.service";

@Component({
  selector: 'app-received-psycho-requests',
  templateUrl: './received-psycho-requests.component.html',
  styleUrls: ['./received-psycho-requests.component.scss']
})
export class ReceivedPsychoRequestsComponent implements OnInit {

  //@ts-ignore
  data:IPagination<Profile>;
  parameters:ProfileKnbParameters = new ProfileKnbParameters();
  constructor(private medService:MedService) {

  }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.medService.getPsycho(this.parameters).subscribe(
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
