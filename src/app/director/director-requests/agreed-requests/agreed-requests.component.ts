import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IPagination} from "../../../shared/helpers/pagination";
import {Profile} from "../../../shared/models/profile/profile";
import {DirectorService} from "../../director.service";
import {DirectorAgreedParameters} from "./directorAgreedParameters";

@Component({
  selector: 'app-agreed-requests',
  templateUrl: './agreed-requests.component.html',
  styleUrls: ['./agreed-requests.component.scss']
})
export class AgreedRequestsComponent implements OnInit {
//@ts-ignore
  data:IPagination<Profile>;
  parameters:DirectorAgreedParameters = new DirectorAgreedParameters();
  constructor(private directorService:DirectorService) {
    this.initializeData();
  }

  ngOnInit(): void {

  }

  initializeData(){
    this.directorService.getOffered(this.parameters).subscribe(
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
