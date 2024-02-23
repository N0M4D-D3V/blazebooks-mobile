import { DemiCardItem } from "demiurge";

export interface Book extends DemiCardItem {
  id: string;
  author: string;
  title: string;

  subtitle?: string;
  imgUrl?: string;
  description?: string;
  genres?: string[];

  createdAt?: Date;
  updatedAt?: Date;

  /**
   * Stores the content. First level refers to chapters and
   * second level refers to pageIDs
   */
  content: number[][];
}

export interface Page {
  html: string;
  options: Option[];
}

export interface Option {
  displayText: string;
  nextPageId: string;

  role?: OptionRole;
}

export enum OptionRole {
  End = "end",
}

export interface Bookmark {
  userId: string;
  bookId: string;
  chapterId: number;
}

export interface LastReaded {
  userId: string;
  book: Book;
}
