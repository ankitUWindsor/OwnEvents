import { UserType } from './../../../assets/enums';
import { User } from 'src/assets/models';
import { emailRegex } from './../../../assets/constants';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  UserType = UserType;
  cameFromOtherPages = false;
  successMessage = '';
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((response) => {
      if (response && response.s) {
        if (response.s === '1') {
          this.successMessage = 'Verification email sent!!';
        } else if (response.s === '2') {
          this.successMessage = 'Password Changed Successfully';
        }
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      }
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      password: ['', Validators.required],
      userType: ['', [Validators.required]]
    });
  }

  get formValues(): any { return this.loginForm.controls; }

  Login(): void {
    this.errorMessage = '';
    if (this.loginForm.valid) {
      const user = new User();
      user.email = this.formValues.email.value.trim();
      user.password = this.formValues.password.value;
      user.userType = this.formValues.userType.value;
      this.authenticationService.AuthenticateUser(user).then((response) => {
        this.router.navigate(['home']);
      }, (err) => {
        this.errorMessage = err.error.message;
      });
    } else {
      if (!this.loginForm.get('email').valid) {
        this.errorMessage = 'Enter a Valid Email';
      } else if (!this.loginForm.get('userType').valid) {
        this.errorMessage = 'Please select your User Type';
      } else {
        this.errorMessage = 'Enter all mandatory fields';
      }
    }
  }

}
