import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-executor-layout',
  templateUrl: './executor-layout.component.html',
  styleUrls: ['./executor-layout.component.scss']
})
export class ExecutorLayoutComponent implements OnInit {

  sidebarState:boolean =true;
  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.sidebarState = !this.sidebarState;
  }

}
