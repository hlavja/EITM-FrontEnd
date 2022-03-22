import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {UserDto} from "../shared/generated/models";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private router: Router,
  ) { }

  logout() {
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('lastName');
    sessionStorage.removeItem('image');
    sessionStorage.removeItem('logins');
    this.router.navigate(['/login']).then(r => console.log(r));
  }

  login(body: string) {
    const user = body as UserDto;
    sessionStorage.setItem('userEmail', user.email);
    sessionStorage.setItem('firstName', user.firstName);
    sessionStorage.setItem('lastName', user.lastName);
    sessionStorage.setItem('image', user.image);
    sessionStorage.setItem('logins', JSON.stringify(user.logins));
    this.router.navigate(['/dashboard']).then(r => console.log(r));
  }

  isLoggedIn() {
    let user: string = sessionStorage.getItem('userEmail');
    if (user) {
      this.router.navigate(['/dashboard']).then(r => console.log(r));
    }
  }

  authIsLoggedIn(): boolean {
    let user: string = sessionStorage.getItem('userEmail');
    return !!user;
  }

  getUserFromStorage() {
    const user: UserDto = {
      email: sessionStorage.getItem('userEmail'),
      image: sessionStorage.getItem('image'),
      firstName: sessionStorage.getItem('firstName'),
      logins: JSON.parse(sessionStorage.getItem('logins')),
      lastName: sessionStorage.getItem('lastName')
    };
    return user;
  }
}
