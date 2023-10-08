export interface CertUserInfo {
  FI: string;
  SURNAME: string;
  type: string; // Added 'type' property
  number: string; // Added 'number' property
  Country: string;
  middleName: string;
  Email: string;
}


export enum ActionSignType {
  none= 'none',
  getKeyInfo = 'getKeyInfo',
  createCMSSignatureFromBase64 = 'createCMSSignatureFromBase64'
}


export enum SignKeyType {
  ANY = '',
  AUTHENTICATION ='AUTHENTICATION',
  SIGNATURE = 'SIGNATURE'
}
