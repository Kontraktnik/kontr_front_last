import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileFileService} from "./profile-file.service";
import {ProfileFile} from "../../models/profile/profileFile";
import {ToastrService} from "ngx-toastr";
import {ValidationErrors} from "../../models/common/validation_errors";
import {faDownload,faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-file-modal',
  templateUrl: './profile-file-modal.component.html',
  styleUrls: ['./profile-file-modal.component.scss']
})
export class ProfileFileModalComponent implements OnInit {

  @Input() profileId?:number;
  //@ts-ignore
  fbGroup:FormGroup;
  //@ts-ignore
  profileFiles:ProfileFile[] = [];
  formData:FormData = new FormData();
  validationErrors:ValidationErrors = {status:false,messages:{}};
  faDownload = faDownload;
  faTimes = faTimes;
  constructor(private service:ProfileFileService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeData();
    this.initializeForm();

  }

  initializeData(){
    this.service.getAll(this.profileId??0).subscribe(
      response=>{
        this.profileFiles = response.data
      }
    )
  }

  initializeForm(){
    this.fbGroup = new FormGroup({
      comment:new FormControl("",[Validators.required]),
    })
  }

  sendFile(){
    if(this.fbGroup.valid){
      this.service.sendProfileFile(this.formData,this.fbGroup.getRawValue() as ProfileFile,this.profileId??0).subscribe(
        response=>{
          this.toastr.success(response.body?.message ?? "Uploaded")
          this.clearForm();
          this.initializeData();
        },
        error=>{
          if(error.errors){
            this.validationErrors.messages = error.errors
            this.validationErrors.status = true
          }
        }
      );

    }
  }

  onFileChange(event: any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData.append('file', file, file.name)
    }
  }

  clearForm(){
    this.fbGroup.reset();
    this.formData = new FormData();
  }

  deleteProfileFile(id:number){
    this.service.deleteProfileFile(id).subscribe(
      response=>{
        this.toastr.success(response?.message ?? "Deleted");
        this.initializeData();
      },
      error=>{
        console.log(error);
      }
    )
  }


}
