/* tslint:disable */
/* eslint-disable */
import { Logins } from './logins';
export interface UserDto {
  email?: string;
  firstName?: string;
  image?: string;
  lastName?: string;
  loggedIn?: boolean;
  logins?: Logins;
}
