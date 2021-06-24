import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { emailRegex } from 'src/assets/constants';
import { UserType } from 'src/assets/enums';
import { User } from 'src/assets/models';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  errorMessage: string;
  UserType = UserType;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }



  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailRegex)]]
    });
  }
  get formValues(): any { return this.forgotForm.controls; }

  noti(): void {
    this.errorMessage = '';
    if (this.forgotForm.valid) {
      const user = new User();
      user.email = this.formValues.email.value.trim();
      this.authenticationService.AuthenticateUser(user).then((response) => {
        this.router.navigate(['login']);
      }, (err) => {
        this.errorMessage = err.error.message;
      });
    } else {
      if (!this.forgotForm.get('email').valid) {
        this.errorMessage = 'Enter a Valid Email';
      } 
    }
  }


}
