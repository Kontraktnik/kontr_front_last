import { Component, OnInit } from '@angular/core';
import { faPlus,faWindowClose,faFilePdf,faFileImage,faFileWord,faFileAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.scss']
})
export class UpdateRequestComponent implements OnInit {
  faPlus = faPlus;
  faFilePdf =faFilePdf;
  faFileImage =faFileImage;
  faFileWord =faFileWord;
  faFileAlt =faFileAlt;
  faWindowClose =faWindowClose;
  constructor() { }

  ngOnInit(): void {
  }

}
