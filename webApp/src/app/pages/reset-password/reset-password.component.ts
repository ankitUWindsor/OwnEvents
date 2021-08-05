import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  token = '';
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe((response) => {
      if (response && response.t) {
        this.token = response.t;
      }
    });
    this.resetForm = this.formBuilder.group({
      // oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      rePassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],

    });
  }
  get formValues(): any { return this.resetForm.controls; }

  reset(): void {
    this.errorMessage = '';
    if (this.resetForm.valid) {
      if (this.resetForm.get('newPassword').value !== this.resetForm.get('rePassword').value) {
        this.errorMessage = 'Password does not match...';
      } else {
        this.authenticationService.ResetPassword(this.token, this.formValues.newPassword.value).then((response) => {
          this.router.navigate(['login'], { queryParams: { s: '2' } });
        }, (err) => {
          this.errorMessage = err.error.message;
        });
        }
    } else {
      if (!this.resetForm.get('newPassword').valid) {
        this.errorMessage = 'Please enter valid new Password';
      } else if (!this.resetForm.get('rePassword').valid) {
        this.errorMessage = 'Please re-enter new Password';
      } else {
        this.errorMessage = 'Enter all mandatory fields';
      }
    }
  }
}
