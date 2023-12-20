import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '@interfaces/book.interface';
import { BookService } from '@services/book.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-reader',
  template: `
    <h1 class="text-center">Reader page</h1>
    @if (book$ | async; as book) {
    <p class="text-center">Reading {{ book.title }} ...</p>
    }
  `,
  styleUrls: [],
  standalone: true,
  imports: [NgIf, AsyncPipe],
})
export class ReaderPage implements OnInit {
  public book$!: Observable<Book>;

  constructor(private readonly bookService: BookService) {}

  ngOnInit(): void {
    this.book$ = this.bookService.getCurrentBookObservable();
  }
}
