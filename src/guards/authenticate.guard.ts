import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AccountService } from '../services/account.service';

@Injectable()
export class AuthenticateGuard implements CanActivate {

  constructor(private router: Router,
              private accountService: AccountService) {}

  canActivate() {
    if (this.accountService.isAccessTokenAlive()) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }

}
