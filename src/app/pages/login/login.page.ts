import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoutePath } from 'src/app/interfaces/route.interface';
import { NgClass } from '@angular/common';
import { AuthService } from '@services/auth.service';
import { DemiAlertService, DemiModalService } from 'demiurge';
import { CreateUserFormComponent } from 'src/app/components/modal/create-user-form/create-user-form.component';
import { FormFactoryService } from '@services/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  public form: FormGroup = this.formFactory.getEmailLoginForm();

  public get email() {
    return this.form.get('email');
  }

  public get pass() {
    return this.form.get('pass');
  }

  constructor(
    private readonly ref: ViewContainerRef,
    private readonly router: Router,
    private readonly formFactory: FormFactoryService,
    private readonly authService: AuthService,
    private readonly demiAlertService: DemiAlertService,
    private readonly demiModalService: DemiModalService
  ) {}

  ngOnInit(): void {
    this.demiModalService.initModalService(this.ref);
    this.demiAlertService.initAlertService(this.ref);
  }

  public loginUser(): void {
    if (this.form.valid) {
      this.authService
        .emailLogin(this.email?.value, this.pass?.value)
        .then((res) => this.router.navigate([RoutePath.Home]))
        .catch((err) => this.wrongCredentialsPopover(err.message));
    }
  }

  public wrongCredentialsPopover(message: string): void {
    this.demiAlertService.create({
      title: 'Error',
      message: message,
      buttons: [{ label: 'OK' }],
    });
  }

  public async onCreateNewUser(): Promise<void> {
    this.demiModalService
      .create({
        component: CreateUserFormComponent,
        data: '',
        styles: {
          width: { vertical: '90%' },
          height: { vertical: '90%' },
        },
      })
      .then((res) => console.error(res));
  }
}
