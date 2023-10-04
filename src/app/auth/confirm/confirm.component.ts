import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  errors = {
    messages: [],
    status: false
  }
  // @ts-ignore
  confirmForm: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.createConfirmForm()
  }

  createConfirmForm() {
    this.confirmForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    })
  }

  onSubmit() {

  }

}
