import { Injectable } from "@angular/core";
import { LocalStorageKey } from "@enum/local-storage.enum";
import { Book } from "@interfaces/book.interface";
import { DemiLocalStorageService } from "demiurge";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CurrentBookService {
  private bsCurrentBook: BehaviorSubject<Book | undefined> =
    new BehaviorSubject<Book | undefined>(undefined);
  private $currentBook: Observable<Book | undefined> =
    this.bsCurrentBook.asObservable();
  private currentBook?: Book | undefined;

  constructor(private readonly localStorage: DemiLocalStorageService) {}

  public $getCurrentBook(): Observable<Book | undefined> {
    if (!this.currentBook) {
      const localBook: Book | undefined = this.localStorage.get<Book>(
        LocalStorageKey.CurrentBook
      );
      if (localBook) this.setCurrentBook(localBook);
    }

    return this.$currentBook;
  }

  public setCurrentBook(book: Book): void {
    this.currentBook = { ...book };
    this.localStorage.save<Book>(LocalStorageKey.CurrentBook, this.currentBook);
    this.bsCurrentBook.next(this.currentBook);
  }
}
