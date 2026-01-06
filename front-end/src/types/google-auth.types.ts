import { Roles } from "./account-types";

export type GoogleAuth = {
  email: string;
  firstName: string;
  lastName: string;
  role?: Roles;
};
