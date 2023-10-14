import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ValidationErrors} from "../../shared/models/common/validation_errors";
import Timeout = NodeJS.Timeout;
import {THIS} from "@rxweb/reactive-form-validators/const";
import {ActionSignType, CertUserInfo} from "../../shared/components/signin/authUserModel";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errors : ValidationErrors = {status:false,messages:{}};

  // @ts-ignore
  registerForm: FormGroup;
  ActionSignType = ActionSignType;

  // @ts-ignore
  ecpUser: CertUserInfo;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private toastr: ToastrService, private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.ecpUser = params as CertUserInfo;
    });
    this.createRegisterForm()
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      iin: [this.ecpUser.number, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(12),]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      name: [this.ecpUser.name, [Validators.required, Validators.pattern("^[а-яА-ЯёЁәӘіІңҢғҒүҮұҰқҚөӨһҺ]*$")]],
      surname: [this.ecpUser.surname, [Validators.required, Validators.pattern("^[а-яА-ЯёЁәӘіІңҢғҒүҮұҰқҚөӨһҺ]*$")]],
      patronymic: [this.ecpUser.middleName, [Validators.pattern("^[а-яА-ЯёЁәӘіІңҢғҒүҮұҰқҚөӨһҺ]*$")]],
      phone: ['', [Validators.required]],
      email: [this.ecpUser.email, [Validators.required, Validators.email]],
      checkbox: [false, [Validators.requiredTrue,Validators.required]],
      birthDay: [this.userService.calculateBirthDay(this.ecpUser.number).toISOString().substring(0,10), [Validators.required]],
      gender: [this.userService.calculateGender(this.ecpUser.number), [Validators.required]],
    })
    // this.registerForm.get('birthDay')?.setValue(this.userService.calculateBirthDay(this.ecpUser.number))
  }

  onSubmit() {
    this.errors.status = false;
    return this.authService.register(this.registerForm.value).subscribe((res) => {
      this.toastr.success(res.message)
      this.router.navigate(['/auth/verify'], { queryParams: { iin: this.registerForm.controls["iin"].value } });
    }, error => {
      if (error.errors) {
        this.errors.messages = error.errors
        this.errors.status = true
      }
    })
  }


  checkIINandRegister($event: CertUserInfo) {
    this.registerForm.controls["iin"].markAsTouched({});
    if($event.number== this.registerForm.controls['iin'].value){
      this.onSubmit();
    }
    else{
      this.registerForm.controls['iin'].setErrors({'wrong': true});
      console.log(this.registerForm.controls['iin'].errors)
    }
  }

  checkIINisExist() : boolean {
    return this.ecpUser.number.length > 0;
  }
}
