import { Component, OnInit } from '@angular/core';
import {faBriefcase,faPeopleArrows,faTags,faKey,faCalendar,faMoneyCheck} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-calulation-home',
  templateUrl: './calulation-home.component.html',
  styleUrls: ['./calulation-home.component.scss']
})
export class CalulationHomeComponent implements OnInit {
  faBriefcase = faBriefcase;
  faPeopleArrows = faPeopleArrows;
  faTags = faTags;
  faKey = faKey;
  faCalendar = faCalendar;
  faMoneyCheck = faMoneyCheck;
  constructor() { }

  ngOnInit(): void {
  }

}
