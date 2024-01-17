import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutePath } from 'src/app/interfaces/route.interface';
import { NgClass } from '@angular/common';
import { AuthService } from '@services/auth.service';
import {
  DemiAlertService,
  DemiLocalStorageService,
  DemiModalService,
} from 'demiurge';
import { FormFactoryService } from '@services/form.service';
import { ALERT_CONFIG, AlertEnum } from '@config/alert.config';
import { ModalEnum, getModalConfig } from '@config/modal.config';
import { LocalStorageKey } from '@enum/local-storage.enum';
import { Subscription, filter, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule],
  styles: `
  #new-account{
    color: var(--color-primary);
    width:100%; height: 100%;
  }

  #create-recover{
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  `,
})
export class LoginPage implements OnInit, OnDestroy {
  private subUser!: Subscription;
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

    this.subUser = this.authService
      .$getUser()
      .pipe(
        filter((response) => !!response),
        tap(() => this.router.navigate([RoutePath.Home]))
      )
      .subscribe();
  }

  public loginWithEmail(): void {
    if (this.form.valid) {
      const isAuth: boolean = this.authService.emailLogin(
        this.email?.value,
        this.pass?.value
      );

      if (isAuth) this.router.navigate([RoutePath.Home]);
      else this.wrongCredentialsAlert();
    }
  }

  public async onCreateNewUser(): Promise<void> {
    this.demiModalService.create(getModalConfig(ModalEnum.NewUser));
  }

  private wrongCredentialsAlert(): void {
    this.demiAlertService.create(ALERT_CONFIG[AlertEnum.Login]);
  }

  ngOnDestroy(): void {
    this.subUser.unsubscribe();
  }
}
