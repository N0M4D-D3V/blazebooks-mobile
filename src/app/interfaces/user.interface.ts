import { DemiUser } from "demiurge";
import { Book } from "./book.interface";

export interface Credentials {
  email: string;
  passwd: string;
}

export interface User extends DemiUser {
  lastOpened?: Book;
}
