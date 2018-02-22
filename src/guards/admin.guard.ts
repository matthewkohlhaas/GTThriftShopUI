import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { AdminService } from '../services/admin.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
              private adminService: AdminService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAdmin = LocalStorageService.getIsAdmin();
    if (isAdmin !== null) {
      if (isAdmin === true) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    }
    this.setAdminStatusAndReroute(state.url);
    return false;
  }

  private setAdminStatusAndReroute(route: string): void {
    this.adminService.isAdmin().subscribe(res => {
      LocalStorageService.addIsAdmin(res);
      if (res === true) {
        this.router.navigate([route]);
      } else {
        this.router.navigate(['']);
      }
    }, err => {
      this.router.navigate(['']);
    });
  }

}
