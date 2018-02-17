import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LocalStorageService } from '../services/local_storage.service';

@Injectable()
export class AuthenticateGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    if (LocalStorageService.getAccessToken()) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }

}
