import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faFilePdf,faFileImage,faFileWord,faFileAlt} from "@fortawesome/free-solid-svg-icons";
import {Survey} from "../../../shared/models/survey/survey";
@Component({
  selector: 'app-saved-request',
  templateUrl: './saved-request.component.html',
  styleUrls: ['./saved-request.component.scss']
})
export class SavedRequestComponent implements OnInit {

  faFilePdf =faFilePdf;
  faFileImage =faFileImage;
  faFileWord =faFileWord;
  faFileAlt =faFileAlt;
  currentFile:string = "";
  constructor() { }
  //@ts-ignore
  @Input() survey:Survey
  @Output() sendRequest = new EventEmitter<number>();
  @Output() deleteRequest = new EventEmitter<number>();

  ngOnInit(): void {
  }


  setCurrentFile(file:string|null|undefined){
    if(file){
      this.currentFile = file;
    }
  }

  sendSelectedRequest(){
    this.sendRequest.emit(this.survey.id);
  }

  deleteSelectedRequest(){
      this.deleteRequest.emit(this.survey.id);
  }
}
