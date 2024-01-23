import { User } from "@interfaces/user.interface";

export const distinct = (prev?: User, curr?: User): boolean => {
  return JSON.stringify(prev) === JSON.stringify(curr);
};
