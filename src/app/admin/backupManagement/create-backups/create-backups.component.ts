import { Component, OnInit } from '@angular/core';
import {BackupService} from "../../../shared/services/backup.service";
import {Toast, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-backups',
  templateUrl: './create-backups.component.html',
  styleUrls: ['./create-backups.component.scss']
})
export class CreateBackupsComponent implements OnInit {
  parameters:string[] = [];
  constructor(private service:BackupService,private toastr:ToastrService) { }

  selectParams:any= [
    {title:"Области",code:"Areas"},
    {title:"Ведомости",code:"ArmyDepartments"},
    {title:"Звания",code:"ArmyRanks"},
    {title:"Региональные командования",code:"ArmyRegions"},
    {title:"Тип ВС",code:"ArmyTypes"},
    {title:"Категория Позиций",code:"CategoryPositions"},
    {title:"Водительские категории прав",code:"DriverLicenses"},
    {title:"Образование",code:"Educations"},
    {title:"Категория тарифов",code:"JobCategories"},
    {title:"Годы служений",code:"JobYears"},
    {title:"Мед статусы",code:"MedicalStatuses"},
    {title:"Нотификации",code:"PhoneNotifications"},
    {title:"Позиции",code:"Positions"},
    {title:"Файлы заявки",code:"ProfileFiles"},
    {title:"Заявки",code:"Profiles"},
    {title:"Квалификации",code:"Qualifications"},
    {title:"Надбавка за звание",code:"RankSalaries"},
    {title:"Семейный статус",code:"Relatives"},
    {title:"Роли",code:"Roles"},
    {title:"Уровень секретности",code:"SecretLevels"},
    {title:"Заслуга возраста",code:"ServiceYears"},
    {title:"Группа этапов",code:"StepGroups"},
    {title:"Порядок этапов",code:"StepOrders"},
    {title:"Порядок этапов",code:"Steps"},
    {title:"Водительские права заявки",code:"SurveyDrivers"},
    {title:"Исполнители",code:"SurveyExecutors"},
    {title:"Семейный статус заявки",code:"SurveyRelatives"},
    {title:"Заявка",code:"Surveys"},
    {title:"Пользователи",code:"Users"},
    {title:"Вакансии",code:"Vacancies"},
    {title:"ВТШ",code:"VtShes"},
  ]


  ngOnInit(): void {
  }

  onSelectDbName(dbName:string){
    if(this.parameters.includes(dbName)){
      this.parameters.splice(this.parameters.indexOf(dbName),1);
    }
    else{
      this.parameters.push(dbName);
    }
  }

  uploadDB(){
    this.service.generateBackup(this.parameters).subscribe(
      res=>{
        this.toastr.success("Успешно создано");
      },
      error => {
        console.log(error);
      }

    )
  }

}
