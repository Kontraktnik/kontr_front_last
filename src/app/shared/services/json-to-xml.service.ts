import { Injectable } from '@angular/core';
import * as xmlbuilder from 'xmlbuilder';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class JsonConverterService {
  constructor(private translate: TranslateService) {
    // this.translate.setDefaultLang('en'); // Set the default language
  }

  jsonToXml(jsonData: any): string {
    const xml = xmlbuilder.create('root');

    this.jsonToXmlRec(xml, jsonData);
    console.log(xml.end())
    return xml.end();
  }

  transformJsonString(json: object): string {
    const keyValuePairs = [];

    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        // @ts-ignore
        keyValuePairs.push(`${key}: ${json[key]}`);
      }
    }

    return `${keyValuePairs.join('; ')}`;
  }


  private jsonToXmlRec(xml: xmlbuilder.XMLElement, data: any): void {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] === 'object') {
          const childElement = xml.ele(key);
          this.jsonToXmlRec(childElement, data[key]);
        } else {
          xml.ele(key, data[key]);
        }
      }
    }
  }



}
