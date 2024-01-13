import { DemiCardItem } from 'demiurge';

export interface Book extends DemiCardItem {
  id: string;
  author: string;
  title: string;

  subtitle?: string;
  imgUrl?: string;
  description?: string;
  genres?: string[];
  chapterIDs: string[];
}

export interface BookChapter {
  id: string;
  title: string;

  quote: BookQuote;
  options: BookOption[];

  pages: BookPage[];
}

export interface BookPage {
  id: string;
  paragraphs: string[];
  options: BookOption[];
}

export interface BookOption {
  id: string;
  text: string;
  goToPage: string;

  role?: OptionRole;
}

export interface BookQuote {
  text: string;
  book: string;
  year: number;
}

export enum OptionRole {
  End = 'end',
}
