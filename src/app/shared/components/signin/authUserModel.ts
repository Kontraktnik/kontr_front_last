import {GenderEnum} from "../../services/user.service";

export interface CertUserInfo {
  FI: string;
  surname: string;
  name: string;
  type: string; // Added 'type' property
  number: string; // Added 'number' property
  Country: string;
  middleName: string;
  email: string;

  keyHashFull: string;
  keyHash: string;
  birthDay?: Date;
  gender?: GenderEnum;
}


export enum ActionSignType {
  none= 'none',
  getKeyInfo = 'getKeyInfo',
  createCMSSignatureFromBase64 = 'createCMSSignatureFromBase64',
  signXml = 'signXml',
  getActiveTokens ='getActiveTokens'
}


export enum SignKeyType {
  ANY = '',
  AUTHENTICATION ='AUTHENTICATION',
  SIGNATURE = 'SIGNATURE'
}
