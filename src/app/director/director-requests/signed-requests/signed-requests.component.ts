import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IPagination} from "../../../shared/helpers/pagination";
import {Profile} from "../../../shared/models/profile/profile";
import {DirectorService} from "../../director.service";
import {SignedDirectorParameters} from "./signedDirectorParameters";

@Component({
  selector: 'app-signed-requests',
  templateUrl: './signed-requests.component.html',
  styleUrls: ['./signed-requests.component.scss']
})
export class SignedRequestsComponent implements OnInit {
//@ts-ignore
  data:IPagination<Profile>;
  parameters:SignedDirectorParameters = new SignedDirectorParameters();
  constructor(private directorService:DirectorService) {

  }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.directorService.getSigned(this.parameters).subscribe(
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
