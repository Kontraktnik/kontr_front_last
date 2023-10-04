import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-knb-layout',
  templateUrl: './knb-layout.component.html',
  styleUrls: ['./knb-layout.component.scss']
})
export class KnbLayoutComponent implements OnInit {
  sidebarState:boolean =true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.sidebarState = !this.sidebarState;
  }

}
