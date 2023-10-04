import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-med-layout',
  templateUrl: './med-layout.component.html',
  styleUrls: ['./med-layout.component.scss']
})
export class MedLayoutComponent implements OnInit {
  sidebarState:boolean =true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.sidebarState = !this.sidebarState;
  }
}
