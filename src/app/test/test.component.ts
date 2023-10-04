import { Component, OnInit } from '@angular/core';
import {SignalrCommonService} from "../shared/services/signalr/signalr-common.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private signalService:SignalrCommonService) { }

  ngOnInit(): void {
    this.signalService.runConnection();
  }

  sendMessage(){
    this.signalService.sendMessage();
  }



}
