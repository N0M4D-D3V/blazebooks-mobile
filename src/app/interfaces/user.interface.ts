import { DemiUser } from "demiurge";
import { Book, BookChapter, BookPage } from "./book.interface";

export interface Credentials {
  email: string;
  passwd: string;
}

export interface User extends DemiUser {
  lastOpened?: Book;
}

export interface UserConfig {
  id?: string;
  userId: string;

  lastBook?: Book;
  lastChapter?: BookChapter;
  lastPage?: BookPage;
}
