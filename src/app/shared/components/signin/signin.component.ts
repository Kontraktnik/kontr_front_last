/* tslint:disable */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
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
  this.inProcess = false;
  if (event.code != 200) {
      // this.sendUserNotify('error', event.message);
      return;
  }
  this.onOk.emit(event.responseObject);
  // this.sendSignRaw();
  // this.emit();
}

  signXml(event: any) {
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
      let resp = this.parseStringToAuthUserInfo(event.responseObject.subjectDn)
      resp.keyHashFull = event.responseObject.pem;
      resp.keyHash = this.clearEcpKey(event.responseObject.pem);
      console.log(resp);
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
  if(this.command == ActionSignType.signXml){
    createCMSSignatureFromBase64 = {
      module: 'kz.gov.pki.knca.commonUtils',
      method: this.command,
      args: ['PKCS12', this.keyType, this.singRaw, "", ""]
    };
  }

  this.webSocket.send(JSON.stringify(createCMSSignatureFromBase64));
}

  //Конвертация информации об человеке в нормальный объект
  private parseStringToAuthUserInfo(inputString: string): CertUserInfo {
    const parts = inputString.split(',');
    const authUserInfo: CertUserInfo = {
      FI: '',
      surname: '',
      name: '',
      type: '',
      number: '',
      Country: '',
      middleName: '',
      email: '',
      keyHash: '',
      keyHashFull: ''
    };

    parts.forEach((part) => {
      const [key, value] = part.split('=');
      switch (key) {
        case 'CN':
          authUserInfo.FI = value;
          const words = value.split(' ');
          if (words.length >= 2) {
            // Get the second word (index 1)
            authUserInfo.name = words[1];
          }
          break;
        case 'SURNAME':
          authUserInfo.surname = value;
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
          authUserInfo.email = value;
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

  private clearEcpKey(key: string): string {
    // Define the substrings to remove
    const substringsToRemove = [
      "-----END CERTIFICATE-----",
      "-----BEGIN CERTIFICATE-----",
      "\r",
      "\n"
    ];

    // Remove the specified substrings
    let result = key;
    for (const substring of substringsToRemove) {
      result = result.replace(new RegExp(substring, 'g'), "");
    }

    // Remove the last 3 characters
    // result = result.slice(0, -3);

    return result;
  }
}



