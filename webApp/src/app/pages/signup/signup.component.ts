import { UserType } from './../../../assets/enums';
import { emailRegex } from './../../../assets/constants';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string;
  UserType = UserType;
  constructor(
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(25)]],
      reEnterPassword: ['', [Validators.required, Validators.maxLength(25)]],
      userType: ['', [Validators.required]]
    });
  }

  Signup() {
  }

}
