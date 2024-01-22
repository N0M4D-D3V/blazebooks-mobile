import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormFactoryService } from "@services/form.service";
import { DemiAlertItem, DemiAlertService, DemiModalService } from "demiurge";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";
import { Subscription } from "rxjs";
import { AlertEnum, getAlertConfig } from "@config/alert.config";
import { AuthService } from "@services/auth.service";
import { RegisterForm } from "@interfaces/register-form.interface";

@Component({
  selector: "app-create-user-form",
  templateUrl: "./create-user-form.component.html",
  styleUrls: ["./create-user-form.component.scss"],
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule],
})
export class CreateUserFormComponent implements OnInit, OnDestroy {
  private subFormChanges!: Subscription;

  public isEmailOk!: boolean;
  public isPassOk!: boolean;

  public form: FormGroup = this.formFactory.getEmailRegistrationForm();

  public get email() {
    return this.form.get("email");
  }

  public get confirmEmail() {
    return this.form.get("confirmEmail");
  }

  public get pass() {
    return this.form.get("pass");
  }

  public get confirmPass() {
    return this.form.get("confirmPass");
  }

  constructor(
    private readonly demiModalService: DemiModalService,
    private readonly demiAlertService: DemiAlertService,
    private readonly authService: AuthService,
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
    let alert!: AlertEnum;

    if (this.form.invalid) alert = AlertEnum.InvalidForm;
    if (!this.isEmailOk) alert = AlertEnum.EmailNotMatch;
    if (!this.isPassOk) alert = AlertEnum.PassNotMatch;

    if (alert) {
      this.createAlertError(alert);
      return;
    }

    if (this.email?.value && this.pass?.value) this.createEmailAccount();
  }

  public createEmailAccount(): void {
    this.authService
      .register({ email: this.email!.value, passwd: this.pass!.value })
      .then(() => this.demiModalService.close({ data: this.form.value }))
      .catch(() => this.createAlertError(AlertEnum.UserAlreadyExists));
  }

  private createAlertError(alert: AlertEnum): void {
    const alertConfig: DemiAlertItem = getAlertConfig(alert);
    this.demiAlertService.create(alertConfig);
  }

  public onClose(): void {
    this.demiModalService.close();
  }

  ngOnDestroy(): void {
    this.subFormChanges.unsubscribe();
  }
}
