import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-director-sidebar',
  templateUrl: './director-sidebar.component.html',
  styleUrls: ['./director-sidebar.component.scss']
})
export class DirectorSidebarComponent implements OnInit {
  @Input() sideBarOpen:boolean = true;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

}
