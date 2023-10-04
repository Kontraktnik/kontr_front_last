import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  @Input() sideBarOpen:boolean = true;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
  }

}
