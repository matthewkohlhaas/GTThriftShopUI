import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

const TOKEN_NAME = 'ACCESS_TOKEN';

@Injectable()
export class AuthenticateGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem(TOKEN_NAME)) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
