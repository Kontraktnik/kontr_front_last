import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { faArrowAltCircleLeft,faArrowAltCircleRight  } from '@fortawesome/free-solid-svg-icons';
import {GlobalTranslateService} from "../../services/common/global-translate.service";
import {DirectorService} from "../../../director/director.service";
import {
  DirectorReceivedParameters
} from "../../../director/director-requests/received-requests/directorReceivedParameters";
import {DirectorAgreedParameters} from "../../../director/director-requests/agreed-requests/directorAgreedParameters";

@Component({
  selector: 'app-director-header',
  templateUrl: './director-header.component.html',
  styleUrls: ['./director-header.component.scss']
})
export class DirectorHeaderComponent implements OnInit {

  @Output() toggleNav = new EventEmitter<string>();
  @Input() sidebarState:boolean = false;
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;
  sendedCount:number = 0;
  offeredCount: number = 0;
  constructor(public translateService: GlobalTranslateService,private directorService:DirectorService) { }

  ngOnInit(): void {
    this.translateService.getCurrentLang();
    this.initializeData();
  }

  toggleSidebar(){
    this.toggleNav.emit();
  }

  initializeData(){
    this.directorService.getSended(new DirectorReceivedParameters()).subscribe(res=>{
      this.sendedCount = res?.count ?? 0;
    })
    this.directorService.getOffered(new DirectorAgreedParameters()).subscribe(res=>{
      this.offeredCount = res?.count ?? 0;
    })
  }

}
