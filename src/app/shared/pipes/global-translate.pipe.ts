import { Pipe, PipeTransform } from '@angular/core';
import {GlobalTranslateService} from "../services/common/global-translate.service";
import {TruncatePipe} from "./truncate.pipe";

@Pipe({
  name: 'globalTranslate'
})
export class GlobalTranslatePipe implements PipeTransform {

  constructor(private truncate: TruncatePipe) {
  }

  transform(value: any,target:string, currentLang:string|null, limit:number|null = null): unknown {
    if (currentLang != null) {
      if (currentLang == 'kz') {
        if (target == 'title') {
          if (limit != null) {
            return this.truncate.transform(value.titleKz, limit)
          } else {
            return value.titleKz
          }
        }
        if (target == 'description') {
          if (limit != null) {
            return this.truncate.transform(value.descriptionKz, limit)
          } else {
            return value.descriptionKz
          }
        }
      }
      if (currentLang == 'ru') {
        if (target == 'title') {
          if (limit != null) {
            return this.truncate.transform(value.titleRu, limit)
          } else {
            return value.titleRu
          }
        }
        if (target == 'description') {
          if (limit != null) {
            return this.truncate.transform(value.descriptionRu, limit)
          } else {
            return value.descriptionRu
          }
        }
      }
    }
    return null;
  }

}
