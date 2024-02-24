import { Injectable } from "@angular/core";
import { ApiDbRepository } from "@repositories/api-db.repository";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class PageService {
  constructor(private readonly api: ApiDbRepository) {}

  public getPage(ref: string): Observable<any> {
    return this.api.get(`pages/${ref}`);
  }
}
