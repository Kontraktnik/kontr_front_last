import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IUser} from "../../models/user/user";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss']
})
export class AuthHeaderComponent implements OnInit {
  active:boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  openNav():void{
    this.active = !this.active;
  }

}
