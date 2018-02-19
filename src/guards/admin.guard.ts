import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LocalStorageService } from '../services/local_storage.service';
import { AdminService } from '../services/admin.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
              private adminService: AdminService) {}

  canActivate() {
    const isAdmin = LocalStorageService.getIsAdmin();
    if (isAdmin != null) {
      return isAdmin;
    }
    this.adminService.isAdmin().subscribe(res => {
      if (res) {
        LocalStorageService.addIsAdmin(res);
        return res;
      } else {
        return this.blockRoute();
      }
    }, err => {
      return this.blockRoute();
    });
  }

  private blockRoute(): boolean {
    this.router.navigate(['']);
    return false;
  }

}
