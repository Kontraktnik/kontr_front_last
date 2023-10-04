import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {BusyService} from "./shared/services/busy.service";
import {forkJoin, of} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {error} from "@rxweb/reactive-form-validators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'contractClient';
  loading = true;
  constructor(private authService: AuthService, private busyService: BusyService, private translateService: TranslateService, private router: Router) {
    this.busyService.busy()
    // translateService.setDefaultLang('ru')
    translateService.use('ru')
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const lang = localStorage.getItem('lang');
    const sources = [
      token ? this.authService.loadCurrentUser(token) : of(null),
      lang ? this.translateService.use(lang) : of(null)
    ];
    forkJoin([
      ...sources
    ]).subscribe(() => { }, error => {
        if (error) {
          localStorage.removeItem('token')
          location.href = '/auth/login'
        }
      },
      () => {
      console.log('app loaded');
      this.loading = false;
      this.busyService.idle();
    });
  }

  loadCurrentUser() {
    let token = localStorage.getItem('token')
    if (token) {
      this.authService.loadCurrentUser(token).subscribe(() => {
        console.log('user logged in')
      }, error => {
        console.log(error)
      })
    }

  }
}
