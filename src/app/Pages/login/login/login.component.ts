import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';
import { LoginRequest } from '../../../services/auth/login.request';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorLogin: boolean = false;
  loginError: string = '';
  loginSubscription: Subscription;


  loginForm = this.formBuilder.group({
    email: ['pablounin@gmail.com', [Validators.required,Validators.email, Validators.pattern('pablounin@gmail.com')]],
    password: ['uninpahu', [Validators.required, Validators.pattern('uninpahu')]]
  })

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }


  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }


  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData)
        },
        error: (errorData) => {
          console.error("algo anda mal...", errorData);
          this.loginError = errorData;
          this.loginForm.controls.password.reset();
          this.loginForm.markAllAsTouched()
        },
        complete: () => {
          console.info("Login correcto");
          this.router.navigateByUrl('/inicio')
          this.loginForm.reset();
        }
      })
    }
    else {
      this.loginForm.markAllAsTouched()
      this.errorLogin = true;
      alert('Revise los datos')
    }
  }


}
