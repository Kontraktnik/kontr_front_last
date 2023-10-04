import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {HubConnection} from "@microsoft/signalr";
import {group} from "@angular/animations";
import {AppConfigService} from "../../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class SignalrCommonService {
  baseUrl:string = '';
  //@ts-ignore
  newConnection:HubConnection;
  constructor(private appConfigService: AppConfigService) {
		this.baseUrl = this.appConfigService.baseUrl;
  }


  runConnection() {
  this.newConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl + '/testHub?token='+localStorage.getItem("token"))
      .build();
    this.newConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
    this.newConnection.on('joined', (data) => {
      console.log(data);
    });
    this.newConnection.on('TestMessage', (data) => {
      console.log(data);
    });
  }

  sendMessage(){
    this.newConnection.invoke("sendTestMessage","HellO!");
  }
}
