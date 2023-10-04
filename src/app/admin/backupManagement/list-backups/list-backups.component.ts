import { Component, OnInit } from '@angular/core';
import {BackupService} from "../../../shared/services/backup.service";
import {Observable} from "rxjs";
import {IResponse} from "../../../shared/models/common/response";
import {Role} from "../../../shared/models/user/role";
import {Backup} from "../../../shared/models/file/backup";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-backups',
  templateUrl: './list-backups.component.html',
  styleUrls: ['./list-backups.component.scss']
})
export class ListBackupsComponent implements OnInit {
  //@ts-ignore
  data:Backup[];

  constructor(private service:BackupService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.service.getBackups().subscribe(
      res=>{
        this.data = res;
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteBackup(filePath:string){
    return this.service.deleteBackup(filePath).subscribe(
      res=>{
        if(res){
          this.toastr.success("Успешно удалено");
          this.initializeData();
        }
        else{
          this.toastr.error("Не найдено");
        }
      },
      error => {
        console.log(error)
      }
    );
  }

}
