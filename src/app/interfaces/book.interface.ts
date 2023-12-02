import { DemiCardItem } from 'demiurge';

export interface Book extends DemiCardItem {
  id: string;
  author: string;
  description?: string;
  genres?: string[];
}
