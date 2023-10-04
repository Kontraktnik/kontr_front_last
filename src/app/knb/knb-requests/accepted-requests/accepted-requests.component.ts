import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IPagination} from "../../../shared/helpers/pagination";
import {Profile} from "../../../shared/models/profile/profile";
import {KnbService} from "../../knb.service";
import {ProfileKnbParameters} from "../../profileKnbParameters";

@Component({
  selector: 'app-accepted-requests',
  templateUrl: './accepted-requests.component.html',
  styleUrls: ['./accepted-requests.component.scss']
})
export class AcceptedRequestsComponent implements OnInit {
//@ts-ignore
  data:IPagination<Profile>;
  parameters:ProfileKnbParameters = new ProfileKnbParameters();
  constructor(private knbService:KnbService) {

  }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.knbService.getAccepted(this.parameters).subscribe(
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
