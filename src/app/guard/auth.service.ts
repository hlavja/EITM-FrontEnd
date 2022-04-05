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
    localStorage.clear();
    this.router.navigate(['/login']).then(r => console.log(r));
  }

  login(body: string) {
    const user = body as UserDto;
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('lastName', user.lastName);
    localStorage.setItem('image', user.image);
    localStorage.setItem('logins', JSON.stringify(user.logins));
    this.router.navigate(['/dashboard']).then(r => console.log(r));
  }

  isLoggedIn() {
    let user: string = localStorage.getItem('userEmail');
    if (user) {
      this.router.navigate(['/dashboard']).then(r => console.log(r));
    }
  }

  authIsLoggedIn(): boolean {
    let user: string = localStorage.getItem('userEmail');
    return !!user;
  }

  getUserFromStorage() {
    const user: UserDto = {
      email: localStorage.getItem('userEmail'),
      image: localStorage.getItem('image'),
      firstName: localStorage.getItem('firstName'),
      logins: localStorage.getItem('logins') ? JSON.parse(localStorage.getItem('logins')) : null,
      lastName: localStorage.getItem('lastName')
    };
    return user;
  }
}
