export interface Book {
  id: string;
  title: string;
  author: string;

  description?: string;
  cover?: string;
  genres?: string[];
}
