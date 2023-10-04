import { Component, OnInit } from '@angular/core';
import {faUsers,faCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  faCheck = faCheck;
  faUsers = faUsers;
  constructor() { }

  ngOnInit(): void {
  }

}
