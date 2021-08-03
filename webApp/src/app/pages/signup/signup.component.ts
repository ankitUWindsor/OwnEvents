import { AuthenticationService } from './../../services/authentication/authentication.service';
import { UserType } from './../../../assets/enums';
import { emailRegex } from './../../../assets/constants';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/assets/models';

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
    private authenticationService: AuthenticationService,
    private router: Router,
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

  Signup(): void {
    this.errorMessage = '';
    if (this.signupForm.valid) {
      if (this.signupForm.get('password').value !== this.signupForm.get('reEnterPassword').value) {
        this.errorMessage = 'Password does not match...';
      } else {
        const user = new User();
        user.name = this.signupForm.get('name').value.trim();
        user.email = this.signupForm.get('email').value.trim();
        user.password = this.signupForm.get('password').value;
        user.userType = this.signupForm.get('userType').value;
        this.authenticationService.RegisterUser(user).then((response: any) => {
          this.router.navigate(['login'], { queryParams: { s: '1' } });
        }, (err) => {
          this.errorMessage = err.error.message;
        });
      }
    } else {
      if (!this.signupForm.get('email').valid) {
        this.errorMessage = 'Enter a Valid Email';
      } else if (!this.signupForm.get('userType').valid) {
        this.errorMessage = 'Please select your User Type';
      } else {
        this.errorMessage = 'Enter all mandatory fields';
      }
    }
  }

}
