import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiDbRepository {
  private url: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.url}/${url}`);
  }
}
