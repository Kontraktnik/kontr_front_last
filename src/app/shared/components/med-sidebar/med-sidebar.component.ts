import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-med-sidebar',
  templateUrl: './med-sidebar.component.html',
  styleUrls: ['./med-sidebar.component.scss']
})
export class MedSidebarComponent implements OnInit {
  @Input() sideBarOpen:boolean = true;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

}
