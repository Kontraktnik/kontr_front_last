import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ValidationErrors} from "../../shared/models/common/validation_errors";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit,OnDestroy {
  errors : ValidationErrors = {status:false,messages:{}};
  // @ts-ignore
  confirmForm:FormGroup;
  isRegistered:boolean = false;
  isSendAgain:boolean = false;
  iin:string = "";
  seconds:number = 60;
  isSended:boolean = false;
  //@ts-ignore
  subs:Subscription;
  constructor(private authService: AuthService,private Activatedroute:ActivatedRoute, private fb: FormBuilder, private router: Router, private toastr: ToastrService)
  {

  }

  ngOnInit(): void {
    this.subs = this.Activatedroute.queryParamMap
      .subscribe(params => {
        this.iin = params.get('iin')??"";
      });
    this.initializeForm();
  }


  initializeForm(){
    this.confirmForm = new FormGroup({
      iin:new FormControl("",[Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(12),]),
      code:new FormControl("",[Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6),]),
    });
    if(this.iin.length == 12){
      this.confirmForm.controls["iin"].setValue(this.iin);
    }
  }


  sendNotification(){
    if(!this.isSended && this.confirmForm.controls["iin"].value){
      return this.authService.sendNotification(this.confirmForm.controls["iin"].value).subscribe((res) => {
        this.toastr.success(res.message);
        this.timerSender();
      }, error => {
        if (error.errors) {
          this.errors.messages = error.errors
          this.errors.status = true
        }
      })
    }
    return null;
  }


  timerSender(){
    var that = this;
    that.isSended = true;
    that.seconds = 60;
    setTimeout(function () {
      that.isSended = false;
      clearInterval(timer);
    }, 61000);
    var timer = setInterval(function () {
      if(that.seconds > 0){
        that.seconds -= 1;
      }
    },1000);

  }

  onVerify(){
    this.errors.status = false;
    return this.authService.verify(this.confirmForm.value).subscribe((res) => {
      this.toastr.success(res.message)
      this.router.navigateByUrl("/auth/login");
    }, error => {
      if (error.errors) {
        this.errors.messages = error.errors
        this.errors.status = true
      }
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
