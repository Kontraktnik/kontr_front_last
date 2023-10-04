import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-executor-sidebar',
  templateUrl: './executor-sidebar.component.html',
  styleUrls: ['./executor-sidebar.component.scss']
})
export class ExecutorSidebarComponent implements OnInit {

  @Input() sideBarOpen:boolean = true;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }
}
