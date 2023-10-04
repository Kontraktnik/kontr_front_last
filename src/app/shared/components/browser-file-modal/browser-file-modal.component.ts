import {Component, Input, OnChanges, OnInit} from '@angular/core';
@Component({
  selector: 'app-browser-file-modal',
  templateUrl: './browser-file-modal.component.html',
  styleUrls: ['./browser-file-modal.component.scss']
})
export class BrowserFileModalComponent implements OnInit,OnChanges {

  @Input() fileUrl:string|null = ""
  imageExtension : string[] = [".jpg","jpg","jpeg",".jpeg","png",".png",".bmp","bmp","gif",".gif"];
  wordExtension : string[] = [".doc","doc","xml",".xml","docx",".docx",".ppt","ppt","pptx",".pptx"];
  loading:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    this.loading = true;
    if(changes.fileUrl.currentValue){
      this.fileUrl = changes.fileUrl.currentValue;
    }
    this.loading = false;
  }

   get_url_extension(url:string) {
     return (url = url.substr(1 + url.lastIndexOf("/")).split('?')[0]).split('#')[0].substr(url.lastIndexOf("."))
  }

}
