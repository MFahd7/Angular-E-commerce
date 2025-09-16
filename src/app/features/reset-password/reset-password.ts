import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  step = 1;
  isLoading = false;
  private toastr = inject(ToastrService);
  private authService = inject(AuthService);
  private router = inject(Router)

  handleFPsubmit() {
    if (this.step === 1) {
      if (this.forgetPasswordGroup.invalid) {
        this.forgetPasswordGroup.markAllAsTouched();
        return;
      }

      // move the email to the set password form
      this.setPasswordGroup.get('email')?.patchValue(this.forgetPasswordGroup.value.email || '');
      this.isLoading = true;
      this.authService.forgetPassword({email : this.forgetPasswordGroup.value.email!}).subscribe({
        next: (response) => {
          this.toastr.success('Code sent to your Email', 'Success');
          this.step++; // Move to the next step
          this.isLoading = false;
        },
        error: (err) => {
          const errorMessage = err?.error?.message || 'No account found with this email.';
          this.toastr.error(errorMessage, 'Error');
          this.isLoading = false;
        },
      });
 
    } else if (this.step === 2) {
      if (this.verifyCodeGroup.invalid) {
        this.verifyCodeGroup.markAllAsTouched();
        return;
      }
      this.isLoading = true;
      this.authService.verifyCode({resetCode : this.verifyCodeGroup.value.resetCode!}).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.toastr.success('Code is Correct', 'Success');
          this.step++; // Move to the next step
        },
        error: (err) => {
          const errorMessage = err?.error?.message || 'Invalid verification code.';
          this.toastr.error(errorMessage, 'Error');
          this.isLoading = false;
        }
      });
    }
  }

  handleEnd() {
    if (this.setPasswordGroup.invalid) {
      this.setPasswordGroup.markAllAsTouched();
      return;
    }
    this.isLoading = true
    this.authService.resetPassword({ email: this.setPasswordGroup.value.email!, newPassword: this.setPasswordGroup.value.newPassword! }).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toastr.success('Password reset successfully', 'Done');
        localStorage.setItem("token", response.token)
        this.authService.decodedToken(response.token)
        this.router.navigate(['/'])
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'Wrong Password pattern.';
        this.toastr.error(errorMessage, 'Error');
        this.isLoading = false;
      },
    });

  }

  forgetPasswordGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  verifyCodeGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  setPasswordGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,11}$/),
      Validators.maxLength(12),
    ]),
  });
  
}
