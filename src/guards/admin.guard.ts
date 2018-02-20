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
      if (isAdmin === true) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    }
    this.getAdminStatusFromServer();
    return false;
  }

  private getAdminStatusFromServer(): void {
    this.adminService.isAdmin().subscribe(res => {
      if (res != null) {
        LocalStorageService.addIsAdmin(res);
        if (res === true) {
          this.router.navigate([this.router.url]);
        } else {
          this.router.navigate(['']);
        }
      } else {
        this.router.navigate(['']);
      }
    }, err => {
      this.router.navigate(['']);
    });
  }

}
