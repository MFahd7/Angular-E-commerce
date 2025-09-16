import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService, UserData } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  // input type is dynamic
  getInputType(item: string): string {
    if (item === 'rePassword' || item === 'password') return 'password';
    if (item === 'phone') return 'tel';
    return item; // 'email', 'text', etc.
  }

  register(value: UserData) {
    this.isLoading = true;
    this.authService.register(value).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('registration done: ', response);

        // save token
        localStorage.setItem('token', response.token);
        this.authService.decodedToken(response.token);
        
        this.toastr.success('Registration successful!', 'Success');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        console.log('Registration faild: ', err);
        if (err?.error?.message) {
          this.toastr.error(err.error.message, 'Error');
        }
      },
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();

      // Find the first invalid control
      const firstInvalidControl: HTMLElement = document.querySelector(
        'form .ng-invalid',
      ) as HTMLElement;

      if (firstInvalidControl) {
        firstInvalidControl.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        firstInvalidControl.focus();
      }
    } else {
      const values = this.registerForm.value;
      this.register(values as UserData); // added as userdata
    }
  }

  arrOfInputs = ['name', 'email', 'password', 'rePassword', 'phone'];

  registerForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{5,11}$/),
        Validators.maxLength(12),
      ]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    },
    { validators: this.matchPasswordValid },
  );

  matchPasswordValid(group: AbstractControl): null | Record<string, any> {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    return password === rePassword
      ? null
      : {
          misMatch: {
            passwordValue: password,
            rePasswordValue: rePassword,
          },
        };
  }

  ControllerName(item: string): FormControl | null {
    return this.registerForm.get(item) as FormControl | null;
  }

  get passwordMismatch(): boolean {
    return !!this.registerForm.errors?.['misMatch'];
  }

  showPassword: { [key: string]: boolean } = {};

  togglePasswordVisibility(field: string) {
    this.showPassword[field] = !this.showPassword[field];
  }
}
