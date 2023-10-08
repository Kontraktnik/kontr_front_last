import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ValidationErrors} from "../../shared/models/common/validation_errors";
import Timeout = NodeJS.Timeout;
import {THIS} from "@rxweb/reactive-form-validators/const";
import {ActionSignType, CertUserInfo} from "../../shared/components/signin/authUserModel";

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

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      iin: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(12),]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.pattern("^[а-яА-ЯёЁәӘіІңҢғҒүҮұҰқҚөӨһҺ]*$")]],
      surname: ['', [Validators.required, Validators.pattern("^[а-яА-ЯёЁәӘіІңҢғҒүҮұҰқҚөӨһҺ]*$")]],
      patronymic: ['', [Validators.pattern("^[а-яА-ЯёЁәӘіІңҢғҒүҮұҰқҚөӨһҺ]*$")]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      checkbox: [false, [Validators.requiredTrue,Validators.required]]
    })

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
}
