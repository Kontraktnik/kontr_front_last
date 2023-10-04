import { faCheck,faTimes,faTimesCircle  } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../../shared/models/user/user";
import {UserService} from "../../../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.scss']
})
export class UserSingleComponent implements OnInit {
  faCheck = faCheck;
  faTimes = faTimes;
//@ts-ignore
  iin:string;
  //@ts-ignore
  user:IUser;

  constructor(
    private service:UserService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(res => {this.iin=res.iin});
  }

  ngOnInit(): void {
    this.initializeData()
  }

  initializeData(){
    this.service.getByIIN(this.iin).subscribe(
      response=>{
        this.user = response.data;
      }
    )
  }

}
