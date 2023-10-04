import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {IResponse} from "../models/common/response";
import {Calculation} from "../models/calculation/calculation";
import {catchError, map} from "rxjs/operators";
import {AppConfigService} from "./app.config.service";
import {AuthService} from "../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SignService {
	baseApiUrl: string = '';
	webSocket: any = null;
	cryptoSocketApiKey: string = '';
	tumSocketСonnectTryCount: number = 0;
	tumSocketСonnected: boolean = false;
	currentUser: any = null;
	
	constructor(private http: HttpClient, private authService: AuthService, private toastr: ToastrService, private appConfigService: AppConfigService) {
		this.cryptoSocketApiKey = this.appConfigService.cryptoSocketApiKey;
		this.baseApiUrl = this.appConfigService.baseApiUrl;
		this.authService.currentUser$.subscribe(res => {
			this.currentUser = res.data;
		});
	}
	
	getMessageDigest(surveyId: bigint) : Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get(this.baseApiUrl + "/DigitalSign/GetSigningData/" + surveyId)
				.subscribe({
					next: (data: any) => resolve(data),
					error: (err) => reject(err),
				});
		});
	}

	uploadSignBase64(signDataForm: any) : Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.post(this.baseApiUrl + "/DigitalSign/UploadSignBase64", signDataForm)
				.subscribe({
					next: (data: any) => resolve(data),
					error: (err) => reject(err),
				});
		});
	}
	
	getDigitalSigns(surveyId: bigint) : Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get(this.baseApiUrl + "/DigitalSign/GetDigitalSigns/" + surveyId)
				.subscribe({
					next: (data: any) => resolve(data),
					error: (err) => reject(err),
				});
		});
	}

	verifyDigitalSigns(surveyId: bigint) : Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get(this.baseApiUrl + "/DigitalSign/VerifyDigitalSigns/" + surveyId)
				.subscribe({
					next: (data: any) => resolve(data),
					error: (err) => reject(err),
				});
		});
	}

	validateCertificate(data: any) : Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.post(this.baseApiUrl + "/DigitalSign/ValidateCertificate", data)
				.subscribe({
					next: (data: any) => resolve(data),
					error: (err) => reject(err),
				});
		});
	}

	loadCertThenSign = (surveyId: bigint, currentUserData: any) => {
		const webSocket = this.initWebSocket();

		this.connectWebSocket(webSocket, (connectRes: any) => {
			if (connectRes.result == 'true') {
				this.tumSocketСonnectTryCount = 0;
				this.tumSocketСonnected = true;
				this.startSign(webSocket, surveyId, currentUserData);
			} else {
				console.warn('connectRes', connectRes);
				this.toastr.error("Не удалось подключиться к CryptoSocket");
			}
		}, (closeReason: any, isNormal: boolean | null, code: number | null) => {
			if (!isNormal) {
				this.tumSocketСonnectTryCount = this.tumSocketСonnectTryCount + 1;
				if (this.tumSocketСonnectTryCount < 5 && !this.tumSocketСonnected) {
					this.loadCertThenSign(surveyId, currentUserData);
				} else {
					this.toastr.error(closeReason);
					this.tumSocketСonnectTryCount = 0;
					this.tumSocketСonnected = false;
				}
			}
		});
	}

	checkCertificate = async (webSocket: any, profile: any, currentUserData: any, validateResult: any, surveyId: bigint) => {
		if (!profile) {
			this.toastr.error("Не найден профиль");
			return;
		}

		if (validateResult && !validateResult.isValid || !validateResult) {
			this.toastr.error("Во время валидации произошла ошибка");
			return;
		}

		if (validateResult && validateResult.iin && currentUserData && currentUserData.iin && validateResult.iin != currentUserData.iin) {
			this.toastr.error("Ключ не принадлежит текущему пользователю");
			return;
		}

		const signingData = await this.getMessageDigest(surveyId);

		let fileNames = '';

		if (Array.isArray(signingData.attachments) && signingData.attachments.length > 0) {
			signingData.attachments.forEach((s: any) => {
				if (fileNames) {
					fileNames += '<>' + s.name;
				} else {
					fileNames = s.name;
				}
			});
		}

		if (Array.isArray(signingData.edses) && signingData.edses.length > 0) {
			signingData.edses.forEach((e: any) => {
				if (fileNames) {
					fileNames += '<>' + e.fileName;
				} else {
					fileNames = e.fileName;
				}
			});
		}

		const payload = {
			profile,
			hashType: 2,
			isConvert: true,
			hash: signingData.messageDigest,
			descr: 'ESEDO',
			signattr: [{
				oid: '1.3.6.1.5.5.7.48.1.1',
				isBin: true,
				value: validateResult.ocspResponse,
			}],
		};

		if (fileNames) {
			payload.signattr.push({
				oid: '1.2.840.113549.1.9.77',
				isBin: false,
				value: fileNames,
			});
		}

		this.webSocketSignEsedoCMS(webSocket, payload, async (signEsedoCMSRes: any) => await this.handleEsedoCms(signEsedoCMSRes, surveyId));
	}

	handleEsedoCms = async (signEsedoCMSRes: any, surveyId: bigint) => {
		if (signEsedoCMSRes.result == 'true') {
			const currentTime = new Date();
			const signFileName = this.getSignFileName(currentTime);

			const uploadDigitalSign = {
				surveyId,
				signed: currentTime,
				signedUtc: new Date(Date.UTC(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds())),
				fileName: signFileName,
			};

			const uploadBase64Data = new FormData();
			uploadBase64Data.append('sign', signEsedoCMSRes.cms);
			uploadBase64Data.append('data', JSON.stringify(uploadDigitalSign));
			const uploadBase64Result = await this.uploadSignBase64(uploadBase64Data);

			if (uploadBase64Result > 0) {
				
			} else {
				this.toastr.error("Произошла ошибка при сохранении подписи.");
			}
		} else {
			console.warn('signEsedoCMSRes', signEsedoCMSRes);
			this.toastr.error("Во время подписи произошла ошибка.");
		}
	}

	getSignFileName = (currentTime: any) => {
		const currentTimeMonth = currentTime.getMonth() + 1;
		let signDateTimeFormat = currentTime.getFullYear().toString();
		signDateTimeFormat += currentTimeMonth < 10 ? '0' + currentTimeMonth.toString() : currentTimeMonth.toString();
		signDateTimeFormat += currentTime.getDate() < 10 ? '0' + currentTime.getDate().toString() : currentTime.getDate().toString();
		signDateTimeFormat += currentTime.getHours() < 10 ? '0' + currentTime.getHours().toString() : currentTime.getHours().toString();
		signDateTimeFormat += currentTime.getMinutes() < 10 ? '0' + currentTime.getMinutes().toString() : currentTime.getMinutes().toString();
		signDateTimeFormat += currentTime.getSeconds() < 10 ? '0' + currentTime.getSeconds().toString() : currentTime.getSeconds().toString();
		return `sign_${signDateTimeFormat}.sign`;
	}

	startSign = (webSocket: any, surveyId: bigint, currentUserData: any) => {
		this.webSocketGetAllCertificate(webSocket, async (certResult: any) => {
			const keys = Object.keys(certResult).filter(k => k.indexOf('certificate') >= 0);

			if (certResult.result == 'true' && Array.isArray(keys) && keys.length > 0) {

				if (Array.isArray(keys) && keys.length > 1) {
					let validCertFound = false;
					let certFound = false;

					console.warn('certValidate keys', keys);

					const proceedkeys = await keys.reduce(async (acc: any, certkey: string, ix) => {
						if (!validCertFound) {
							const data = {
								certificateBase64: certResult[certkey].certificateBlob
							};
							const validateRes = await this.validateCertificate(data);

							let profile = certResult[certkey].profile;

							if (validateRes && validateRes.iin && currentUserData && currentUserData.iin
								&& validateRes.iin == currentUserData.iin) {
								certFound = true;

								if (!validCertFound && validateRes && validateRes.isValid) {
									validCertFound = true;
									if (validateRes.certificateKey && certkey != validateRes.certificateKey) {
										profile = certResult[validateRes.certificateKey].profile;
									}
								} else if (validateRes && !validateRes.isValid && validateRes.errorInfo) {
									console.warn(`not valid certResult for ${certkey}`, validateRes);
								}
							} else {
								console.warn(`certResult for ${certkey}. is iin equal = ${validateRes.iin == currentUserData.iin}.
									validateRes.isValid = ${validateRes.isValid}. validateRes.isExpired = ${validateRes.isExpired}`);
							}

							if (validCertFound) {
								console.warn('profile', profile);
								await this.checkCertificate(webSocket, profile, currentUserData, validateRes, surveyId);
							} else if (ix == keys.length - 1) {
								if (certFound && !validCertFound) {
									this.toastr.error("Не найден валидный сертификат");
								} else if (!certFound) {
									this.toastr.error("Ключ не принадлежит текущему пользователю");
								} else {
									this.toastr.error("Не найден сертификат");
								}
							}
						} else {
							console.warn('certValidate valid cert found', certkey);
						}

						return [...await acc, certkey];
					}, []);
					
					console.warn('proceedkeys', proceedkeys);
				} else if (keys.length == 1) {
					let profile = certResult[keys[0]].profile;
					const data = {
						certificateBase64: certResult[keys[0]].certificateBlob
					};
					const validateResult = await this.validateCertificate(data);

					if (validateResult && validateResult.iin && currentUserData && currentUserData.iin
						&& validateResult.iin == currentUserData.iin) {
							await this.checkCertificate(webSocket, profile, currentUserData, validateResult, surveyId);
					} else {
						this.toastr.error("Ключ не принадлежит текущему пользователю");
					}
				}
			} else {
				console.warn('certResult', keys, certResult);
				this.toastr.error("Не найден сертификат");
			}
		});
	}

	initWebSocket = () => {
		return new WebSocket('ws://localhost:6126/tumarcsp/');
	}

	errorConnectCallBack = (data: any) => {
		console.warn('CryptoSocket error', data);
	}

	connectWebSocket = (webSocket: any, callback: Function, onCloseCallback: Function | null) => {
		webSocket.onopen = () => {
			var param = {
				'TumarCSP': 'SYSAPI',
				'Function': 'SetAPIKey',
				'Param': {
					'apiKey': this.cryptoSocketApiKey,
				},
			};

			webSocket.onmessage = (ev: any) => {
				callback(JSON.parse(ev.data));
			};

			webSocket.send(JSON.stringify(param));
		};

		webSocket.onclose = (event: any) => {
			let reason = '';
			if (event.code == 1001) {
				reason = 'An endpoint is "going away", such as a server going down or a browser having navigated away from a page.';
			} else if (event.code == 1002) {
				reason = 'An endpoint is terminating the connection due to a protocol error';
			} else if (event.code == 1003) {
				reason = 'An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).';
			} else if (event.code == 1004) {
				reason = 'Reserved. The specific meaning might be defined in the future.';
			} else if (event.code == 1005) {
				reason = 'No status code was actually present.';
			} else if (event.code == 1006) {
				reason = 'The connection was closed abnormally, e.g., without sending or receiving a Close control frame';
			} else if (event.code == 1007) {
				reason = 'An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [https://www.rfc-editor.org/rfc/rfc3629] data within a text message).';
			} else if (event.code == 1008) {
				reason = 'An endpoint is terminating the connection because it has received a message that "violates its policy". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.';
			} else if (event.code == 1009) {
				reason = 'An endpoint is terminating the connection because it has received a message that is too big for it to process.';
			} else if (event.code == 1010) { // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
				reason = 'An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn\'t return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: ' + event.reason;
			} else if (event.code == 1011) {
				reason = 'A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.';
			} else if (event.code == 1015) {
				reason = 'The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can\'t be verified).';
			} else {
				reason = 'Unknown reason';
			}

			if (reason) {
				console.warn(event.code, reason);
			}

			if (onCloseCallback) {
				onCloseCallback(reason, event.code == 1000, event.code);
			}
		};

		webSocket.onerror = this.errorConnectCallBack;
	}

	webSocketGetAllCertificate = (webSocket: any, callback: Function) => {
		var param = {
			'TumarCSP': 'BaseAPI',
			'Function': 'GetAllCertificate',
			'Param': {
				//"id":options.id,
			},
		};

		webSocket.onmessage = (ev: any) => {
			callback(JSON.parse(ev.data));
		};

		webSocket.send(JSON.stringify(param));
	}

	webSocketSignEsedoCMS = (webSocket: any, options: any, callback: Function) => {
		var param = {
			'TumarCSP': 'ASNAPI',
			'Function': 'SignCMS',
			'Param': {
				'profile':options.profile,
				'hashType':options.hashType,
				'isConvert':options.isConvert,
				//"pass":options.pass,
				//"id":options.id,
				//"sn":options.sn,
				//"data":options.data,
				'hash':options.hash,
				//"cert":options.cert,
				//"tsp":options.tsp,
				'descr':options.descr,
				'signattr':options.signattr,
				'unsignattr':options.unsignattr,
				//"type":options.type,
				//"addOID":options.addOID,
				//"cmsData":options.cmsData,
			},
		};

		webSocket.onmessage = (ev: any) => {
			callback(JSON.parse(ev.data));
		};

		webSocket.send(JSON.stringify(param));
	}
}
