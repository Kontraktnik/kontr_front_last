import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebcamImage} from "ngx-webcam";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnDestroy {
// @ts-ignore
  private trigger: Subject = new Subject();
  public webcamImage!: WebcamImage;
  // @ts-ignore
  private nextWebcam: Subject = new Subject();
  captureImage  = '';

  constructor() { }

  ngOnDestroy(): void {
    this.trigger.complete();
    console.log("ngOnDestroy completed");
    }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.captureImage = webcamImage!.imageAsDataUrl;
    console.info('received webcam image', this.captureImage);
  }

  // @ts-ignore
  public get triggerObservable(): Observable {
    return this.trigger.asObservable();
  }
}
