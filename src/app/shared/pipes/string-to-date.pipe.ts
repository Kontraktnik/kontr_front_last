import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToDate'
})
export class StringToDatePipe implements PipeTransform {

  transform(value: string | null | undefined, format:string = "dd.mm.yyyy") {

    if(value && value?.length == 8){
      if(format == "dd.mm.yyyy"){
        var dateFormat = value.split("");
        return `${dateFormat[0]}${dateFormat[1]}.${dateFormat[2]}${dateFormat[3]}.${dateFormat[4]}${dateFormat[5]}${dateFormat[6]}${dateFormat[7]}`
      }
    }
    return value;

  }

}
