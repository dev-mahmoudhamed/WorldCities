import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { BaseFormComponent } from '../base-form.component';
import { AuthService } from './auth.service';
import { RegisterRequest } from './register-request';
import { RegisterResult } from './register-result';
import { LoginRequest } from './login-request';
import { LoginComponent } from './login.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent extends BaseFormComponent implements OnInit {
  title?: string;
  registerResult?: RegisterResult;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    var registerRequest = <RegisterRequest>{};
    registerRequest.email = this.form.controls['email'].value;
    registerRequest.password = this.form.controls['password'].value;

    var login_request = <LoginRequest>{
      email: registerRequest.email,
      password: registerRequest.password
    };

    this.authService.register(registerRequest).subscribe(result => {
      console.log(result);
      this.registerResult = result;
      if (result.success) {
        this.router.navigate(["/"]).then(() => {
          console.log(login_request);
          this.authService.login(login_request);
        }).then(() => {
          this.authService.login(login_request).subscribe(res => {
            console.log(res);
            if (res.success) {
              this.router.navigate(["/"]);
            }
          })
        });
      }
    }, error => {
      console.log(error);
      if (error.status == 400) {
        this.registerResult = error.error;
      }
    });
  }
}