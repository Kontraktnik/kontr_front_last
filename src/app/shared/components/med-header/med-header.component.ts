import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { faArrowAltCircleLeft,faArrowAltCircleRight  } from '@fortawesome/free-solid-svg-icons';
import {MedService} from "../../../med/med.service";
import {ProfileMedParameters} from "../../../med/profileMedParameters";

@Component({
  selector: 'app-med-header',
  templateUrl: './med-header.component.html',
  styleUrls: ['./med-header.component.scss']
})
export class MedHeaderComponent implements OnInit {
  @Output() toggleNav = new EventEmitter<string>();
  @Input() sidebarState:boolean = false;
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;
  sendedCount:number = 0;
  sendedPsychoCount:number = 0;
  constructor(private service:MedService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  toggleSidebar(){
    this.toggleNav.emit();
  }

  initializeData(){
    this.service.getSended(new ProfileMedParameters).subscribe(
      res=>{
        this.sendedCount = res?.count ??0;
      }
    );
    this.service.getPsycho(new ProfileMedParameters).subscribe(
      res=>{
        this.sendedPsychoCount = res?.count ??0;
      }
    );
  }

}
