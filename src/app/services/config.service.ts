import { Injectable } from "@angular/core";
import { DEFAULT_CONFIG } from "@config/default-conf.config";
import { LocalStorageKey } from "@enum/local-storage.enum";
import { Config } from "@interfaces/config.interface";
import { DemiLocalStorageService } from "demiurge";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  constructor(private readonly localStorage: DemiLocalStorageService) {}

  public save(conf: Config): void {
    this.localStorage.save(LocalStorageKey.Config, conf);
  }

  public get(): Config {
    return this.localStorage.get(LocalStorageKey.Config) ?? DEFAULT_CONFIG;
  }

  public clear(): void {
    this.localStorage.delete(LocalStorageKey.Config);
  }
}
