import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Links } from "@enum/links.enum";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiDbRepository {
  private url: string = Links.API;

  constructor(private readonly http: HttpClient) {}

  public get(): Observable<any> {
    return this.http.get(this.url);
  }
}
