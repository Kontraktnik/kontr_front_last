import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IPagination} from "../../../shared/helpers/pagination";
import {Profile} from "../../../shared/models/profile/profile";
import {DirectorService} from "../../director.service";
import {DirectorRejectedParameters} from "./directorRejectedParameters";

@Component({
  selector: 'app-rejected-requests',
  templateUrl: './rejected-requests.component.html',
  styleUrls: ['./rejected-requests.component.scss']
})
export class RejectedRequestsComponent implements OnInit {
//@ts-ignore
  data:IPagination<Profile>;
  parameters:DirectorRejectedParameters = new DirectorRejectedParameters();

  constructor(private directorService:DirectorService) {
    this.initializeData();
  }

  ngOnInit(): void {

  }

  initializeData(){
    this.directorService.getRejected(this.parameters).subscribe(
      response=>{
        //@ts-ignore
        this.data = response;
      },
      error => {

      }
    );
  }

  onPagerChange(event: any) {
    this.parameters.pageIndex = event;
    this.initializeData();
  }


}
