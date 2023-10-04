import { Component, OnInit } from '@angular/core';
import {faMapMarkerAlt, faBuilding, faStar, faMap,faPlane,faAddressCard,faUniversity,faBookMedical,faUsers,faStreetView} from '@fortawesome/free-solid-svg-icons';
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {AppConfigService} from "../../../shared/services/app.config.service";

@Component({
  selector: 'app-system-home',
  templateUrl: './system-home.component.html',
  styleUrls: ['./system-home.component.scss']
})
export class SystemHomeComponent implements OnInit {
  faMapMarkerAlt = faMapMarkerAlt;
  faBuilding = faBuilding;
  faStar = faStar;
  faMap = faMap;
  faPlane = faPlane;
  faAddressCard = faAddressCard;
  faUniversity = faUniversity;
  faBookMedical = faBookMedical;
  faUsers = faUsers;
  faStreetView = faStreetView;
  //
  baseUrl: string = '';
  //@ts-ignore
  private hubConnection: HubConnection;

  constructor(private appConfigService: AppConfigService) {
    this.baseUrl = this.appConfigService.baseUrl;
  }

  ngOnInit(): void {
    this.startConnection();
    this.addTransferChartDataListener();
  }


  public startConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.baseUrl + '/testHub')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('testSignal', (data) => {
      console.log(data);
    });
  }

}
