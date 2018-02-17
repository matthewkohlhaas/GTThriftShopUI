import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LocalStorageService } from '../services/local_storage.service';
import { AdminService } from '../services/admin.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
              private adminService: AdminService) {}

  canActivate() {
    if (LocalStorageService.getIsAdmin()) {
      return true;
    }
    if (this.adminService.isAdmin()) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }

}
