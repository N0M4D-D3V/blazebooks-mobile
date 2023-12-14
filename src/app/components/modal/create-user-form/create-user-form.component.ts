import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormFactoryService } from '@services/form.service';
import { DemiAlertService, DemiModalService } from 'demiurge';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

export interface RegisterForm {
  email: string;
  confirmEmail: string;
  pass: string;
  confirmPass: string;
}
@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: [],
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule],
})
export class CreateUserFormComponent implements OnInit, OnDestroy {
  private subFormChanges!: Subscription;

  public isEmailOk!: boolean;
  public isPassOk!: boolean;

  public form: FormGroup = this.formFactory.getEmailRegistrationForm();

  public get email() {
    return this.form.get('email');
  }

  public get confirmEmail() {
    return this.form.get('confirmEmail');
  }

  public get pass() {
    return this.form.get('pass');
  }

  public get confirmPass() {
    return this.form.get('confirmPass');
  }

  constructor(
    public readonly demiModalService: DemiModalService,
    public readonly demiAlertService: DemiAlertService,
    private readonly formFactory: FormFactoryService
  ) {}

  ngOnInit(): void {
    this.subFormChanges = this.form.valueChanges.subscribe(
      (value: RegisterForm) => {
        this.isEmailOk = value.confirmEmail === value.email;
        this.isPassOk = value.pass === value.confirmPass;
      }
    );
  }

  public onCreateUser(): void {
    if (this.form.invalid) {
      this.demiAlertService.create({
        title: 'ERROR',
        message: 'Invalid form!',
        buttons: [{ label: 'ok' }],
      });
      return;
    }

    if (!this.isEmailOk) {
      this.demiAlertService.create({
        title: 'ERROR',
        message: 'Email not match!',
        buttons: [{ label: 'ok' }],
      });
      return;
    }

    if (!this.isPassOk) {
      this.demiAlertService.create({
        title: 'ERROR',
        message: 'Password not match!',
        buttons: [{ label: 'ok' }],
      });
      return;
    }

    this.demiModalService.close({ data: this.form.value });
  }

  public onClose(): void {
    this.demiModalService.close();
  }

  ngOnDestroy(): void {
    this.subFormChanges.unsubscribe();
  }
}
