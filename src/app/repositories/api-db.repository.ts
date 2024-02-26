import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Links } from "@enum/links.enum";
import { Observable, catchError, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiDbRepository {
  private url: string = Links.API;

  constructor(private readonly http: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.url}/${url}`);
  }
}
