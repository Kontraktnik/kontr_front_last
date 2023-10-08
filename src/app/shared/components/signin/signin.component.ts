/* tslint:disable */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {ActionSignType, CertUserInfo, SignKeyType} from "./authUserModel";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit {

  connection = false;
  webSocket: any;
  inProcess = false;
  @Input() text = 'Войти';
  @Input() singRaw = 'TextToSign';
  @Input() isButtonActive: boolean = true;
  @Input() command: ActionSignType = ActionSignType.none;
  @Input() keyType: SignKeyType = SignKeyType.ANY;

  @Output() onOk = new EventEmitter<any>();
  constructor(public router: Router) {

   }

  ngOnInit()  {
    // this.getSingRaw();
    this.initConnection();
}

checkConnection() {
    if (!this.connection) {
        // this.messageService.create('error', 'Ошибка подключения к NCALayer', {nzDuration: 10000});
    }
}
initConnection() {
    this.webSocket = new WebSocket('wss://127.0.0.1:13579/');
    this.webSocket.onopen = () => this.connection = true;
    this.webSocket.onclose = () => this.connection = false;
    // @ts-ignore
  this.webSocket.onmessage = event => {
    if(this.command != ActionSignType.none){
      // @ts-ignore
      this[this.command].call(this, JSON.parse(event.data));
    }
    };
    // @ts-ignore
  setTimeout(x => {
        this.checkConnection();
    }, 500);

}

  createCMSSignatureFromBase64(event: any) {
  console.log('event', event);
  this.inProcess = false;
  if (event.code != 200) {
      // this.sendUserNotify('error', event.message);
      return;
  }
  this.onOk.emit(event.responseObject);
  // this.sendSignRaw();
  // this.emit();
}

  getKeyInfo(event: any) {
    this.inProcess = false;
    if (event.code != 200) {
      // this.sendUserNotify('error', event.message);
      return;
    }
    if(this.checkKeyToExpired(event.responseObject)){
      const resp = this.parseStringToAuthUserInfo(event.responseObject.subjectDn)
      this.onOk.emit(resp);
    }
    else{
      console.log('Expired');
    }
    // this.sendSignRaw();
    // this.emit();
  }
sign() {
  this.inProcess = true;
  let createCMSSignatureFromBase64 = {};
  if(this.command == ActionSignType.getKeyInfo){
    createCMSSignatureFromBase64 = {
      module: 'kz.gov.pki.knca.commonUtils',
      method: this.command,
      args: ['PKCS12']
    };
  }
  if(this.command == ActionSignType.createCMSSignatureFromBase64){
    createCMSSignatureFromBase64 = {
      module: 'kz.gov.pki.knca.commonUtils',
      method: this.command,
      args: ['PKCS12', this.keyType, this.singRaw, true]
    };
  }

  this.webSocket.send(JSON.stringify(createCMSSignatureFromBase64));
}

  //Конвертация информации об человеке в нормальный объект
  private parseStringToAuthUserInfo(inputString: string): CertUserInfo {
    const parts = inputString.split(',');
    const authUserInfo: CertUserInfo = {
      FI: '',
      SURNAME: '',
      type: '',
      number: '',
      Country: '',
      middleName: '',
      Email: '',
    };

    parts.forEach((part) => {
      const [key, value] = part.split('=');
      switch (key) {
        case 'CN':
          authUserInfo.FI = value;
          break;
        case 'SURNAME':
          authUserInfo.SURNAME = value;
          break;
        case 'SERIALNUMBER':
          authUserInfo.type = value.substring(0,3);
          authUserInfo.number = value.substring(3);
          break;
        case 'C':
          authUserInfo.Country = value;
          break;
        case 'G':
          authUserInfo.middleName = value;
          break;
        case 'E':
          authUserInfo.Email = value;
          break;
      }
    });

    return authUserInfo;
  }

  //Проверяет сертификат на период действия
  private checkKeyToExpired(certificate: any) : boolean {
    const certNotAfterTimestamp = parseInt(certificate.certNotAfter, 10);
    const certNotBeforeTimestamp = parseInt(certificate.certNotBefore, 10);
    const currentTimestamp = Date.now();

// Check if the current date is between certNotBefore and certNotAfter
    if (currentTimestamp >= certNotBeforeTimestamp && currentTimestamp <= certNotAfterTimestamp) {
      return true;
    } else {
      return false;
    }
  }
}



