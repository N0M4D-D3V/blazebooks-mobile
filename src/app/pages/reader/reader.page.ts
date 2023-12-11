import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Book } from '@interfaces/book.interface';
import { BookService } from '@services/book.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reader',
  template: `
    <h1 class="text-center">Reader page</h1>
    <p class="text-center">Reading {{ currentBook.title }} ...</p>
  `,
  styleUrls: [],
  standalone: true,
  imports: [NgIf, AsyncPipe],
})
export class ReaderPage {
  public currentBook: Book = this.bookService.getCurrentBook();

  constructor(private readonly bookService: BookService) {}
}
