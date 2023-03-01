import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]+$/),
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  constructor(private authService: AuthService, private route: Router) {}

  onSubmit() {
    if (this.loginForm.invalid) return;
    return this.authService.signIn(this.loginForm.value).subscribe({
      next: (response) => {
        // Navigate to some other route
        this.route.navigateByUrl('/inbox');
      },
      error: ({ error }) => {
        if (error.username || error.password)
          this.loginForm.setErrors({ invalid: true });
      },
    });
  }
}
