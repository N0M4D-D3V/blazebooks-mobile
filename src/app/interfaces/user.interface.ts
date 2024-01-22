import { DemiUser } from "demiurge";

export interface Credentials {
  email: string;
  passwd: string;
}

export interface User extends DemiUser {}
