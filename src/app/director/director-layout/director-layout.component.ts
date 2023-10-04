import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-director-layout',
  templateUrl: './director-layout.component.html',
  styleUrls: ['./director-layout.component.scss']
})
export class DirectorLayoutComponent implements OnInit {

  sidebarState:boolean =true;
  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.sidebarState = !this.sidebarState;
  }
}
