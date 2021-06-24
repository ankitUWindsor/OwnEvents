import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { emailRegex } from 'src/assets/constants';
import { UserType } from 'src/assets/enums';
import { User } from 'src/assets/models';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  errorMessage: string;
  UserType = UserType;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }


  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      rePassword: ['', Validators.required],
    });
  }
  get formValues(): any { return this.resetForm.controls; }

  reset(): void {
    this.errorMessage = '';
    if (this.resetForm.valid) {
      const user = new User();
    // Below code properties are needed in user file.
      // user.oldPassword = this.formValues.oldPassword.value;
      // user.newPassword = this.formValues.newPassword.value;
      // user.rePassword = this.formValues.rePassword.value;
      this.authenticationService.AuthenticateUser(user).then((response) => {
        this.router.navigate(['home']);
      }, (err) => {
        this.errorMessage = err.error.message;
      });
    } else {
      if (!this.resetForm.get('oldPassword').valid) {
        this.errorMessage = 'Enter a Password';
      } else if (!this.resetForm.get('newPassword').valid) {
        this.errorMessage = 'Please enter new Password';
      } else if (!this.resetForm.get('rePassword').valid) {
        this.errorMessage = 'Please re-enter new Password';
      }
       else {
        this.errorMessage = 'Enter all mandatory fields';
      }
    }
  }

  

}
