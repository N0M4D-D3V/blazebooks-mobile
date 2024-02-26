import { NgStyle } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Config } from "@interfaces/config.interface";
import { ConfigService } from "@services/config.service";
import { DemiAlertService, DemiLocalStorageService } from "demiurge";
import { Subscription, debounceTime } from "rxjs";

const DEBOUNCE_TIME: number = 500;
const NOT_IMPLEMENTED =
  "Funcionalidad no implementada. Estamos trabajando en ello =)";

@Component({
  selector: "app-config",
  templateUrl: "./config.page.html",
  styleUrls: [],
  standalone: true,
  imports: [ReactiveFormsModule, NgStyle],
})
export class ConfigPage implements OnInit, OnDestroy {
  private subForm!: Subscription;
  private config: Config = this.configService.get();

  public form: FormGroup = this.fb.group({
    lightFilter: [this.config.lightFilter],
    fontSize: [this.config.fontSize],
  });

  public get isLightFilterOn(): boolean {
    return this.form.get("lightFilter")!.value as boolean;
  }

  public get fontSize(): number {
    return this.form.get("fontSize")!.value as number;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly configService: ConfigService,
    private readonly demiLocalStorage: DemiLocalStorageService,
    private readonly demiAlertService: DemiAlertService
  ) {}

  ngOnInit() {
    this.subForm = this.form.valueChanges
      .pipe(debounceTime(DEBOUNCE_TIME))
      .subscribe((config: Config) => this.configService.save(config));
  }

  public onRestoreConfig(): void {
    this.configService.clear();

    this.config = this.configService.get();
    this.form.get("lightFilter")?.setValue(this.config.lightFilter);
    this.form.get("fontSize")?.setValue(this.config.fontSize);
  }

  public onDeleteLocalData(): void {
    this.demiAlertService.create({
      title: "ALERTA",
      message:
        "¿Estás seguro de que quieres eliminar los datos locales? Esta acción no puede deshacerse.",
      buttons: [
        {
          label: "CONTINUAR",
          role: "cancel",
          handler: () => {
            this.demiLocalStorage.clear();
            window.location.reload();
          },
        },
        { label: "CANCELAR", role: "continue" },
      ],
      darkMode: true,
    });
  }

  ngOnDestroy(): void {
    this.subForm.unsubscribe();
  }
}
