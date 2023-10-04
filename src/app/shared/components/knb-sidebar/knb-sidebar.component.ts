import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-knb-sidebar',
  templateUrl: './knb-sidebar.component.html',
  styleUrls: ['./knb-sidebar.component.scss']
})
export class KnbSidebarComponent implements OnInit {
  @Input() sideBarOpen:boolean = true;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }
}
