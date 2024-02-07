import { NgStyle } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Subscription, debounce, debounceTime, delay } from "rxjs";

@Component({
  selector: "app-config",
  templateUrl: "./config.page.html",
  styleUrls: [],
  standalone: true,
  imports: [ReactiveFormsModule, NgStyle],
})
export class ConfigPage implements OnInit, OnDestroy {
  private subForm!: Subscription;

  public form: FormGroup = this.fb.group({
    lightFilter: [true],
    fontSize: [22],
  });

  public get isLightFilterOn(): boolean {
    return this.form.get("lightFilter")!.value as boolean;
  }

  public get fontSize(): number {
    return this.form.get("fontSize")!.value as number;
  }

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.subForm = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(console.log);
  }

  public onDeleteLocalData(): void {
    alert("Funcionalidad no implementada. Estamos trabajando en ello =)");
  }

  public onDeleteLocalBooks(): void {
    alert("Funcionalidad no implementada. Estamos trabajando en ello =)");
  }

  ngOnDestroy(): void {
    this.subForm.unsubscribe();
  }
}
