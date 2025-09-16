import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService, UserDataLogin } from '../../core/services/auth.service';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  login(value: UserDataLogin) {
    this.isLoading = true;
    this.authService.Login(value).subscribe({
      next: (response) => {
        this.isLoading = false;

        // for cookies
        this.authService.saveToken(response.token);

        localStorage.setItem('token', response.token);
        this.authService.decodedToken(response.token);

        this.toastr.success('login successful!', 'Success');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        console.log('login faild: ', err);
        if (err?.error?.message) {
          this.toastr.error(err.error.message, 'Error');
        }
      },
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      const values = this.loginForm.value;
      this.login(values as UserDataLogin); // added as userdataLogin
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,11}$/),
      Validators.maxLength(12),
    ]),
  });

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToReset() {
    this.router.navigate(['/reset-password']);
  }
}
