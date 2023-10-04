import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class GlobalTranslateService {
  currentLang:string|null = 'ru'
  constructor(private translateService: TranslateService) { }

  onLangChange(event:string) {
    localStorage.removeItem('lang')
    localStorage.setItem('lang', event)
    this.translateService.setDefaultLang(event)
    this.translateService.use(event)
    this.currentLang = event
  }

  getCurrentLang() {
    let lang:string|null = this.translateService.getDefaultLang()
    if (localStorage.getItem('lang') != null) {
      lang = localStorage.getItem('lang')
    }
    this.currentLang = lang
  }
}
