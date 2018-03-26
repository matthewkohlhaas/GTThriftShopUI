import {AccountService} from '../../services/account.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-main-sidenav',
  templateUrl: './main-sidenav.component.html',
  styleUrls: ['./main-sidenav.component.css']
})
export class MainSidenavComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  private isAdmin: boolean;

  constructor(private accountService: AccountService, private adminService: AdminService) { }

  ngOnInit(): void {
    const localIsAdmin = LocalStorageService.getIsAdmin();
    if (localIsAdmin != null) {
      this.isAdmin = localIsAdmin;
      return;
    }
    this.setAdminStatus();
  }

  private setAdminStatus(): void {
    this.adminService.isAdmin().subscribe(res => {
      LocalStorageService.addIsAdmin(res);
      this.isAdmin = res;
    }, err => {
      this.isAdmin = false;
    });
  }

  private getCurrentUserId(): string {
    return this.accountService.getCurrentUserFromToken()._id;
  }

  public open(): Promise<void> {
    return this.sidenav.open();
  }

  public close(): Promise<void> {
    return this.sidenav.close();
  }

  public toggle(): Promise<void> {
    return this.sidenav.toggle();
  }
}
