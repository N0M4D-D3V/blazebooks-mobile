import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutePath } from 'src/app/interfaces/route.interface';
import { NgClass } from '@angular/common';
import { AuthService } from '@services/auth.service';
import { DemiAlertService, DemiModalService } from 'demiurge';
import { FormFactoryService } from '@services/form.service';
import { ALERT_CONFIG, AlertEnum } from '@config/alert.config';
import { ModalEnum, getModalConfig } from '@config/modal.config';

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
        .then(() => this.router.navigate([RoutePath.Home]))
        .catch(() => this.wrongCredentialsPopover());
    }
  }

  public wrongCredentialsPopover(): void {
    this.demiAlertService.create(ALERT_CONFIG[AlertEnum.Login]);
  }

  public async onCreateNewUser(): Promise<void> {
    this.demiModalService.create(getModalConfig(ModalEnum.NewUser));
  }
}
