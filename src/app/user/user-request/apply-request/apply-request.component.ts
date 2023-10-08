import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {IUser} from "../../../shared/models/user/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {faFilePdf, faImage, faPlus,faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {faSquare} from '@fortawesome/free-regular-svg-icons';
import {Vacancy} from "../../../shared/models/vacancy/vacancy";
import {Position} from "../../../shared/models/calculation/position/position";
import {Area} from "../../../shared/models/system/area";
import {Education} from "../../../shared/models/system/education";
import {ArmyRank} from "../../../shared/models/system/armyRank";
import {Vtsh} from "../../../shared/models/system/vtsh";
import {DriverLicense} from "../../../shared/models/system/driverLicense";
import {Relative} from "../../../shared/models/system/relative";
import {SurveyRelative} from "../../../shared/models/survey/surveyRelative";
import {ToDoRelatives} from "../../../shared/helpers/toDoRelatives";
import {SurveyFiles} from "../../../shared/helpers/surveyFiles";
import {ActivatedRoute, Router} from "@angular/router";
import {VacancyService} from "../../../home/vacancy/vacancy.service";
import {UserService} from "../../user.service";
import {AuthService} from "../../../auth/auth.service";
import {AreaService} from "../../../shared/services/area.service";
import {EducationService} from "../../../shared/services/education.service";
import {DriverLicenseService} from "../../../shared/services/driver-license.service";
import {ArmyRankService} from "../../../shared/services/army-rank.service";
import {VtshService} from "../../../shared/services/vtsh.service";
import {RelativeService} from "../../../shared/services/relative.service";
import {ToastrService} from "ngx-toastr";
import {UploadFileService} from "../../../shared/services/common/upload-file.service";
import {debounceTime, distinct, distinctUntilChanged, map, shareReplay} from "rxjs/operators";
import {PositionService} from "../../../shared/services/position.service";
import {GlobalTranslateService} from "../../../shared/services/common/global-translate.service";
import {TranslateService} from "@ngx-translate/core";
import * as IMask from "imask";
import {ActionSignType, CertUserInfo, SignKeyType} from 'src/app/shared/components/signin/authUserModel';

@Component({
  selector: 'app-apply-request',
  templateUrl: './apply-request.component.html',
  styleUrls: ['./apply-request.component.scss']
})
export class ApplyRequestComponent implements OnInit {

  isSaved:boolean = false
  //@ts-ignore
  currentUser: IUser
  //@ts-ignore
  requestForm: FormGroup;
  faPlus = faPlus;
  faImage = faImage;
  faPdfFile = faFilePdf;
  faCheckCircle = faCheckCircle;
  faSquare = faSquare;
  agreeStatus:boolean = false;
  birthArea:string = ''
  isServedTrue:boolean = true
  vacancy?: Vacancy
  positions: Position[] = []
  position?:Position
  area?:Area
  areas:Area[] = []
  educations:Education[] = []
  armyRanks: ArmyRank[] = []
  listVTSh: Vtsh[] = []
  dropdownDriverLicenseList:DriverLicense[] = [];
  selectedDriverLicenseItems = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'titleRu',
    selectAllText: 'Выбрать все',
    unSelectAllText: 'Убрать все',
    itemsShowLimit: 10,
    allowSearchFilter: true,
    searchPlaceholderText: 'Поиск...'
  };
  relativeStatus: Relative[] = []
  surveyRelatives:SurveyRelative[] = []
  modalRelatives = {
    fio: '',
    status: null,
    birthDate: '',
    iin: ''
  }
  forRelatives = new ToDoRelatives();
//FILES
  formData: FormData = new FormData();
  filesData = {
    image: '',
    autoBio: '',
    education: '',
    income: '',
    employment: '',
    millitary: '',
    special: ''
  }
  surveyFiles:SurveyFiles = new SurveyFiles()
  //END FILES
  imaskDate = {
    mask: Date,

    pattern: 'd.`m.`Y',  // Pattern mask with defined blocks, default is 'd{.}`m{.}`Y'

    blocks: {
      d: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31,
        maxLength: 2,
      },
      m: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2,
      },
      Y: {
        mask: IMask.MaskedRange,
        from: 1900,
        to: 2022,
      }
    },
    // define date -> str convertion
    format(date: any) {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      const year = date.getFullYear();

      if (day < 10) { day = '0' + day; }
      if (month < 10) { month = '0' + month; }

      return [day, month, year].join('.');
    },
    // define str -> date convertion
    parse(str: any) {
      const dayMonthYear = str.split('.');
      return new Date(dayMonthYear[2], dayMonthYear[1] - 1, dayMonthYear[0]);
    },
    min: new Date(1900, 0, 1),
    max: new Date(2022, 12, 31),

    autofix: true,
    lazy: true,
    overwrite: true
  };

  SignKeyType = SignKeyType;
  ActionSignType = ActionSignType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private vacancyService: VacancyService,
    private userService: UserService,
    private fb: FormBuilder,
    private authService: AuthService,
    private areaService: AreaService,
    private educationService: EducationService,
    private driverService: DriverLicenseService,
    private armyRankService: ArmyRankService,
    private vtshService: VtshService,
    private relativeService: RelativeService,
    private toastrService: ToastrService,
    private router: Router,
    private uploadFile: UploadFileService,
    private positionService: PositionService,
    private localeTranslate: TranslateService,
    private location: Location,
    public translate:GlobalTranslateService) {
    this.dropdownSettings.selectAllText = this.localeTranslate.instant('SYSTEM.selectAll')
    this.dropdownSettings.unSelectAllText = this.localeTranslate.instant('SYSTEM.deleteAll')
    this.dropdownSettings.searchPlaceholderText = this.localeTranslate.instant('SYSTEM.search')
    this.authService.currentUser$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(user => {
        return user.data
      }),
      distinct(),
      shareReplay()
    ).subscribe(res => {this.currentUser = res;} )
  }

  ngOnInit(): void {
    // this.getVacancyById()
    this.translate.getCurrentLang()
    this.initializeForm()
    this.getData()
  }

  onSubmit() {
    this.onSavedForm()
    // if (this.isSaved) {
    //   this.requestForm.enable()
      if (this.requestForm.valid) {
        this.requestForm.enable()
        this.userService.sendRequest(this.requestForm.value).subscribe((res) => {
          if (res?.success) {
            this.toastrService.success('Досье успешно отправлено!')
            this.router.navigateByUrl('/user/all-request')
          } else {
            this.toastrService.error('Что-то пошло не так!')
          }
          console.log(res)
        })
      } else {
        this.toastrService.warning('Проверьте правильность заполнения формы!')
        this.validateAllFormFields(this.requestForm)
      }
    // } else {
    //   this.toastrService.warning("Сохраните сначала досье!")
    // }
  }

//INITIALIZE
  initializeForm() {
    this.requestForm = this.fb.group({
      iin: [null],
      fullname: [null],
      email: [null],
      phone: [null],
      birthAreaId: [null, [Validators.required]],
      driverLicense: [''],
      region: [null, [Validators.required]],
      city: [null, [Validators.required]],
      street: [null, [Validators.required]],
      home: [null],
      appartment: [null],
      educationId: [null, Validators.required],
      experienced: [false, Validators.required],
      served: [true, Validators.required],
      servedArmyNumber: [null],
      positionName: [null],
      armyRankId: [null],
      VTShServed: [false, Validators.required],
      VTShId: [null],
      VTShYear: [null],
      positionId: [null, Validators.required],
      armyNumber: [null],
      contractYear: ['', Validators.required],
      areaId: [null, Validators.required],
      vacancyId: [null],
      imageUrl: [null, Validators.required],
      autoBiography: [null, Validators.required],
      educationUrl: [null, Validators.required],
      incomePropertyUrl: [null, Validators.required],
      employmentUrl: [null, Validators.required],
      millitaryUrl: [null, Validators.required],
      specialCheckUrl: [null, Validators.required],
      relatives: [null],
      identityCardUrl: ['sadsdadfssda'],
      agreed: [null, Validators.requiredTrue],
      signKey: [null],
      UserSign: [null],
    })
  }
  getData() {
    this.areaService.getAll().subscribe(res => this.areas = res.data)
    this.educationService.getAll().subscribe(res => this.educations = res.data)
    this.driverService.getAll().subscribe(res => this.dropdownDriverLicenseList = res.data)
    this.armyRankService.getAll().subscribe(res => this.armyRanks = res.data)
    this.vtshService.getAll().subscribe(res => this.listVTSh = res.data)
    this.relativeService.getAll().subscribe(res => this.relativeStatus = res.data)
    this.positionService.getAll().subscribe(res => this.positions = res.data)
  }
//END INITIALIZE

//DRIVER LICENSE
  onDriverLicenseSelect(item: any) {
    // @ts-ignore
    this.selectedDriverLicenseItems.push(item.id)
    this.requestForm.patchValue({driverLicense: this.selectedDriverLicenseItems})
    // console.log(this.requestForm.value)
  }
  onDriverLicenseDeSelect(item:any) {
    this.selectedDriverLicenseItems = this.selectedDriverLicenseItems.filter((value) => value != item.id)
    this.requestForm.patchValue({driverLicense: this.selectedDriverLicenseItems})
    // console.log(this.requestForm.value)
  }
  onSelectDriverLicenseAll(items: any) {
    for (let i = 0; i < items.length; i++) {
      // @ts-ignore
      this.selectedDriverLicenseItems.push(items[i].id)
    }
    this.requestForm.patchValue({driverLicense: this.selectedDriverLicenseItems})
    // console.log(this.requestForm.value)
  }
  onDeSelectDriverLicenseAll() {
    this.selectedDriverLicenseItems = []
    this.requestForm.patchValue({driverLicense: this.selectedDriverLicenseItems})
    // console.log(this.requestForm.value)
  }
//END DRIVER LICENSE

// FILE METHODS
  onFileChange(event: any, type: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData.append('formFile', file, file.name)
      if (type == "imageUrl") {
        this.uploadFile.saveFile(this.formData).subscribe(res => {
          this.filesData.image = res
        })
        this.surveyFiles.imageUrl = file.name
        this.requestForm.controls['imageUrl'].setErrors({'required': null})
      }
      if (type == "autoBio") {
        this.uploadFile.saveFile(this.formData).subscribe(res => {
          this.filesData.autoBio = res
        })
        this.surveyFiles.autoBiography = file.name
        this.requestForm.controls['autoBiography'].setErrors({'required': null})
      }
      if (type == "educationUrl") {
        this.uploadFile.saveFile(this.formData).subscribe(res => {
          this.filesData.education = res
        })
        this.surveyFiles.educationUrl = file.name
        this.requestForm.controls['educationUrl'].setErrors({'required': null})
      }
      if (type == "income") {
        this.uploadFile.saveFile(this.formData).subscribe(res => {
          this.filesData.income = res
        })
        this.surveyFiles.incomePropertyUrl = file.name
        this.requestForm.controls['incomePropertyUrl'].setErrors({'required': null})
      }
      if (type == "employment") {
        this.uploadFile.saveFile(this.formData).subscribe(res => {
          this.filesData.employment = res
        })
        this.surveyFiles.employmentUrl = file.name
        this.requestForm.controls['employmentUrl'].setErrors({'required': null})
      }
      if (type == "millitary") {
        this.uploadFile.saveFile(this.formData).subscribe(res => {
          this.filesData.millitary = res
        })
        this.surveyFiles.millitaryUrl = file.name
        this.requestForm.controls['millitaryUrl'].setErrors({'required': null})
      }
      if (type == "special") {
        this.uploadFile.saveFile(this.formData).subscribe(res => {
          this.filesData.special = res
        })
        this.surveyFiles.specialCheckUrl = file.name
        this.requestForm.controls['specialCheckUrl'].setErrors({'required': null})
      }
      this.requestForm.updateValueAndValidity()
      this.formData = new FormData();
    }
  }
  onDeleteFileChange(type: string) {
    if (type == "imageUrl") {
      // @ts-ignore
      this.surveyFiles.imageUrl = null
      this.filesData.image = ''
      this.requestForm.patchValue({
        imageUrl: null
      })
    }
    if (type == "autoBio") {
      // @ts-ignore
      this.surveyFiles.autoBiography = null
      this.filesData.autoBio = ''
      this.requestForm.patchValue({
        autoBiography: null
      })
    }
    if (type == "educationUrl") {
      // @ts-ignore
      this.surveyFiles.educationUrl = null
      this.filesData.education = ''
      this.requestForm.patchValue({
        educationUrl: null
      })
    }
    if (type == "income") {
      //@ts-ignore
      this.surveyFiles.incomePropertyUrl = null
      this.filesData.income = ''
      this.requestForm.patchValue({
        incomePropertyUrl: null
      });
    }
    if (type == "employment") {
      //@ts-ignore
      this.surveyFiles.employmentUrl = null
      this.filesData.employment = ''
      this.requestForm.patchValue({
        employmentUrl: null
      });
    }
    if (type == "millitary") {
      //@ts-ignore
      this.surveyFiles.millitaryUrl = null
      this.filesData.millitary = ''
      this.requestForm.patchValue({
        millitaryUrl: null
      });
    }
    if (type == "special") {
      //@ts-ignore
      this.surveyFiles.specialCheckUrl = null
      this.filesData.special = ''
      this.requestForm.patchValue({
        specialCheckUrl: null
      });
    }
  }
//END FILE METHODS

//MODAL METHODS
  addRelative() {
    let data = this.modalRelatives.fio.split(' ')
    this.forRelatives.name = data[0]
    this.forRelatives.surName = data[1]
    this.forRelatives.patronomic = data[2]
    if(this.forRelatives.name.length < 1 || this.forRelatives.surName.length < 1){
      this.toastrService.warning('Заполните имя и фамилию');
    }
    else{
      // @ts-ignore
      this.forRelatives.relativeId = parseInt(this.modalRelatives.status)
      this.forRelatives.iin = this.modalRelatives.iin
      this.forRelatives.birthDate = this.modalRelatives.birthDate
      // @ts-ignore
      this.surveyRelatives.push(this.forRelatives)
      this.requestForm.patchValue({
        relatives: this.surveyRelatives
      })
      this.forRelatives = new ToDoRelatives();
      this.modalRelatives = {
        fio: '',
        status: null,
        birthDate: '',
        iin: ''
      }
    }


  }
  getRelative(id: number) {
    return this.relativeStatus.find(p => p.id === id)
  }
  getBirthArea(id: number) {
    let area = this.areas.find(p => p.id == id)
    if (area) {
      return area.titleRu
    }
    return ''
  }
  removeRelative(iin:string) {
    this.surveyRelatives = this.surveyRelatives.filter((val) => val.iin != iin)
    this.requestForm.patchValue({
      relatives: this.surveyRelatives
    })
  }
  addBirthArea() {
    let stringData = {
      area: this.getBirthArea(this.requestForm.get('birthAreaId')?.value),
      region: this.requestForm.get('region')?.value != null ? this.requestForm.get('region')?.value : '',
      city: this.requestForm.get('city')?.value != null ? this.requestForm.get('city')?.value : '',
      street: this.requestForm.get('street')?.value != null ? this.requestForm.get('street')?.value : '',
      home: this.requestForm.get('home')?.value != null ? this.requestForm.get('home')?.value : '',
      appartment: this.requestForm.get('appartment')?.value != null ? this.requestForm.get('appartment')?.value : '',
    }
    this.birthArea = stringData.area + ', ' +
      stringData.region + ', ' + stringData.city + ', ' + stringData.street + ', ' +
      stringData.home + ', ' + stringData.appartment
  }

  AgreeWithPrivacy($event: CertUserInfo){
    this.requestForm.controls["agreed"].markAsTouched({});
    if($event.number== this.currentUser.iin){
      this.requestForm.controls["agreed"].setValue(true);
      const button = window.document.getElementById('modalButtonClose');
      if (button) {
        button.click();
      }
    }
    else{
      console.log('error')
      this.requestForm.controls["agreed"].setValue(false)
      this.requestForm.controls['agreed'].setErrors({'required': true})
      console.log(this.requestForm.controls['agreed'])
    }
  }
//END MODAL METHODS


  //OTHER METHODS
  onSavedForm() {
    this.requestForm.patchValue({
      iin: this.currentUser.iin,
      fullname: this.currentUser.fullName,
      email: this.currentUser.email,
      phone: this.currentUser.phone,
      signKey: 'asfwegwrgwr',
      UserSign: 'asfwegwrg4f42wr',
      imageUrl: this.filesData.image,
      educationUrl: this.filesData.education,
      autoBiography: this.filesData.autoBio,
      incomePropertyUrl: this.filesData.income,
      millitaryUrl: this.filesData.millitary,
      employmentUrl: this.filesData.employment,
      specialCheckUrl: this.filesData.special
    })
    // const invalid = [];
    // const controls = this.requestForm.controls;
    // for (const name in controls) {
    //   if (controls[name].invalid) {
    //     invalid.push(name);
    //   }
    // }
    // console.log(invalid)
    // this.toastrService.info("Досье успешно сохранено!")
    // this.requestForm.disable()
    // this.isSaved = true
  }
  onEditForm() {
    this.requestForm.enable()
    this.isSaved = false
  }
  onResetForm() {
    this.initializeForm()
    this.surveyRelatives = []
    this.selectedDriverLicenseItems = []
    this.surveyFiles = new SurveyFiles()
    this.toastrService.info('Досье успешно очищено')
  }
  onBackLocation() {
    this.location.back()
  }
  changeSurvedOrVTSh(served:any) {
    if (served.value == 1) {
      this.isServedTrue = false
      this.requestForm.patchValue({served: false})
      this.requestForm.patchValue({VTShServed: true})
      this.requestForm.patchValue({servedArmyNumber: null})
      this.requestForm.patchValue({positionName: null})
      this.requestForm.patchValue({armyRankId: null})
    } else if (served.value == 2){
      this.isServedTrue = true
      this.requestForm.patchValue({served: true})
      this.requestForm.patchValue({VTShServed: false})
      this.requestForm.patchValue({VTShId: null})
      this.requestForm.patchValue({VTShYear: null})
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  //END OTHER METHODS


}
