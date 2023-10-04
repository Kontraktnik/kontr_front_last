import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { faArrowAltCircleLeft,faArrowAltCircleRight  } from '@fortawesome/free-solid-svg-icons';
import {ExecutorService} from "../../../executor/executor.service";
import {ProfileExecutorParameters} from "../../../executor/profileExecutorParameters";

@Component({
  selector: 'app-executor-header',
  templateUrl: './executor-header.component.html',
  styleUrls: ['./executor-header.component.scss']
})
export class ExecutorHeaderComponent implements OnInit {

  @Output() toggleNav = new EventEmitter<string>();
  @Input() sidebarState:boolean = false;
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;
  constructor(private service:ExecutorService) { }
  sendedCount:number = 0;
  specialCount:number = 0;
  medCount:number = 0;
  psychoCount:number = 0;
  offerCount:number = 0;
  signingCount:number = 0;
  rejectedCount:number = 0;
  ngOnInit(): void {
    this.initializeData();
  }

  toggleSidebar(){
    this.toggleNav.emit();
  }

  initializeData(){
    this.service.getSended(new ProfileExecutorParameters).subscribe(
      res=>{
        this.sendedCount = res?.count ?? 0;
      }
    );
    this.service.getSpecialCheck(new ProfileExecutorParameters).subscribe(
      res=>{
        this.specialCount = res?.count ?? 0;
      }
    );
    this.service.getMedState(new ProfileExecutorParameters).subscribe(
      res=>{
        this.medCount = res?.count ?? 0;
      }
    );
    this.service.getPsychoState(new ProfileExecutorParameters).subscribe(
      res=>{
        this.psychoCount = res?.count ?? 0;
      }
    );
    this.service.getSendOffer(new ProfileExecutorParameters).subscribe(
      res=>{
        this.offerCount = res?.count ?? 0;
      }
    );
    this.service.getSigning(new ProfileExecutorParameters).subscribe(
      res=>{
        this.signingCount = res?.count ?? 0;
      }
    );
    this.service.getRejected(new ProfileExecutorParameters).subscribe(
      res=>{
        this.rejectedCount = res?.count ?? 0;
      }
    );
  }

}
