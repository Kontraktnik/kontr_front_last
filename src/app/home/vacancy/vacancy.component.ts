import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ArmyType} from "../../shared/models/system/armyType";
import {VacancyService} from "./vacancy.service";
import {Area} from "../../shared/models/system/area";
import {vacancyParams} from "./params";
import {Vacancy} from "../../shared/models/vacancy/vacancy";
import {PositionService} from "../../shared/services/position.service";
import {Position} from "../../shared/models/calculation/position/position";
import {ArmyRegion} from "../../shared/models/system/armyRegion";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {map} from "rxjs/operators";
import {GlobalTranslateService} from "../../shared/services/common/global-translate.service";

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})
export class VacancyComponent implements OnInit {
  //@ts-ignore
  @ViewChild('search') searchTerm: ElementRef;
  keyword = 'titleRu'

  positions: Position[] = [];
  armyTypes:ArmyType[] = [];
  areas:Area[] = [];
  armyRegions:ArmyRegion[] = [];
  vacancies:Vacancy[] = [];
  // @ts-ignore
  vacancyParams: vacancyParams;
  // @ts-ignore
  activeVacancy:Vacancy|null;

  checkArmyTypeIds:number[] = []
  checkAreaIds:number[] = []
  checkArmyRegionIds:number[] = []

  @Input() totalCount?: number;
  @Input() pageSize?: number;
  @Input() pageIndex?: number;

  constructor(
    private vacancyService: VacancyService,
    private positionService: PositionService,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService,
    public translate: GlobalTranslateService) {
    this.vacancyParams = this.vacancyService.getVacancyParams()
  }

  ngOnInit(): void {
    this.translate.getCurrentLang()
    this.getVacancies(true)
    this.getArmyRegions()
    this.getArmyTypes()
    this.getAreas()
    this.getPositions()
  }


  setActiveVacancy(vacancy:Vacancy|null){
    this.activeVacancy = vacancy;
  }

  getPositions(){
    this.positionService.getAll().subscribe(res => {
      this.positions = res.data
    });
  }

  getVacancies(useCache = false) {
    this.vacancyService.getVacancies(useCache).subscribe(response => {
      this.vacancies = response.data;
      this.totalCount = response.count;
      this.pageSize = response.pageSize
      this.pageIndex = response.pageIndex
    }, error => {
      console.log(error);
    });
  }

  onPagerChange(event: any) {
    const params = this.vacancyService.getVacancyParams();
    if (params.pageIndex !== event) {
      params.pageIndex = event;
      this.vacancyService.setVacancyParams(params);
      this.getVacancies();
    }
  }

  getArmyTypes() {
    this.vacancyService.getArmyTypes().subscribe(res => {
      // @ts-ignore
      this.armyTypes = res
    }, error => {
      console.log(error)
    })
  }

  getAreas() {
    this.vacancyService.getAreas().subscribe(res => {
      this.areas = res
    }, error => {
      console.log(error)
    })
  }

  getArmyRegions() {
    this.vacancyService.getArmyRegions().subscribe(res => {
      this.armyRegions = res
    }, error => {
      console.log(error)
    })
  }

  onCheckboxSelected(armyTypeId:null|number, areaId:null|number, armyRegionId:null|number) {
    const params = this.vacancyService.getVacancyParams();
    params.pageIndex = 1;
    if (armyTypeId != null) {
      if (armyTypeId == 0) {
        this.checkArmyTypeIds = []
      } else {
        if (this.checkArmyTypeIds.indexOf(armyTypeId)==-1) {
          this.checkArmyTypeIds.push(armyTypeId)
        } else {
          this.checkArmyTypeIds = this.checkArmyTypeIds.filter((value) => value!=armyTypeId)
        }
      }
      params.armyTypeId = this.checkArmyTypeIds
    }
    if (areaId != null) {
      if (areaId == 0) {
        this.checkAreaIds = []
      } else {
        if (this.checkAreaIds.indexOf(areaId)==-1) {
          this.checkAreaIds.push(areaId)
        } else {
          this.checkAreaIds = this.checkAreaIds.filter((value) => value!=areaId)
        }
      }
      params.area = this.checkAreaIds
    }
    if (armyRegionId != null) {
      if (armyRegionId == 0) {
        this.checkArmyRegionIds = []
      } else {
        if (this.checkArmyRegionIds.indexOf(armyRegionId)==-1) {
          this.checkArmyRegionIds.push(armyRegionId)
        } else {
          this.checkArmyRegionIds = this.checkArmyRegionIds.filter((value) => value!=armyTypeId)
        }
      }
      params.armyRegionId = this.checkArmyRegionIds
    }
    this.vacancyService.setVacancyParams(params);
    this.getVacancies();
    this.setActiveVacancy(null)
  }

  isCheckboxChecked(armyTypeId:null|number, areaId:null|number, armyRegionId:null|number):boolean {
    if (armyTypeId != null) {
      return this.checkArmyTypeIds.indexOf(armyTypeId) != -1;
    }
    if (areaId != null) {
      return this.checkAreaIds.indexOf(areaId) != -1;
    }
    if (armyRegionId != null) {
      return this.checkArmyRegionIds.indexOf(armyRegionId) != -1;
    }
    return false;
  }

  checkedAllCheckbox(armyTypeId:boolean, areaId:boolean, armyRegionId:boolean) {
    if (armyTypeId) {
      this.checkArmyTypeIds = []
      this.onCheckboxSelected(0,null,null)
    }
    if (areaId) {
      this.checkAreaIds = []
      this.onCheckboxSelected(null,0,null)
    }
    if (armyRegionId) {
      this.checkArmyRegionIds = []
      this.onCheckboxSelected(null,null,0)
    }
  }

  isCheckedAllCheckbox(armyTypeId:boolean, areaId:boolean, armyRegionId:boolean):boolean|void {
    if (armyTypeId) {
      return this.checkArmyTypeIds.length <= 0;
    }
    if (areaId) {
      return this.checkAreaIds.length <= 0;
    }
    if (armyRegionId) {
      return this.checkArmyRegionIds.length <= 0;
    }
  }

  selectEvent(item: Position) {
    const params = this.vacancyService.getVacancyParams();
    params.positionId = item.id
    params.pageIndex = 1;
    this.vacancyService.setVacancyParams(params);
    this.getVacancies();
    this.setActiveVacancy(null)
  }

  isClosedAutoComplete() {
    const params = this.vacancyService.getVacancyParams();
    params.positionId = 0
    params.pageIndex = 1;
    this.vacancyService.setVacancyParams(params);
    this.getVacancies();
  }

  //Если нужно будет подключим (Поиск)
  onSearch() {
    const params = this.vacancyService.getVacancyParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageIndex = 1;
    this.vacancyService.setVacancyParams(params);
    this.getVacancies();
  }
}
