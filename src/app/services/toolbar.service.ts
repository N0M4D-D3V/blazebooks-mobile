import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  private searchingBS: BehaviorSubject<string> = new BehaviorSubject('');
  private $searching: Observable<string> = this.searchingBS.asObservable();

  constructor() {}

  public searchIn(value: string): void {
    this.searchingBS.next(value);
  }

  public searchObservable(): Observable<string> {
    return this.$searching.pipe(filter((value) => !!value && value !== ''));
  }
}
