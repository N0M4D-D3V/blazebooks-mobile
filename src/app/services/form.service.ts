import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Injectable({ providedIn: 'root' })
export class FormFactoryService {
  constructor(private readonly fb: FormBuilder) {}

  public getEmailLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      pass: ['', Validators.required],
    });
  }

  public getEmailRegistrationForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      confirmEmail: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      pass: ['', Validators.required],
      confirmPass: ['', Validators.required],
    });
  }
}
