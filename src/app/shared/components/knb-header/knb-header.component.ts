import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { faArrowAltCircleLeft,faArrowAltCircleRight  } from '@fortawesome/free-solid-svg-icons';
import {KnbService} from "../../../knb/knb.service";
import {ProfileKnbParameters} from "../../../knb/profileKnbParameters";

@Component({
  selector: 'app-knb-header',
  templateUrl: './knb-header.component.html',
  styleUrls: ['./knb-header.component.scss']
})
export class KnbHeaderComponent implements OnInit {
  @Output() toggleNav = new EventEmitter<string>();
  @Input() sidebarState:boolean = false;
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;
  sendedCount:number = 0;

  constructor(private service:KnbService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  toggleSidebar(){
    this.toggleNav.emit();
  }

  initializeData(){
    this.service.getSended(new ProfileKnbParameters).subscribe(
      res=>{
        this.sendedCount = res?.count ?? 0;
      }
    )
  }

}
