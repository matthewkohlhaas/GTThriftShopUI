import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-main-sidenav',
  templateUrl: './main-sidenav.component.html',
  styleUrls: ['./main-sidenav.component.css']
})
export class MainSidenavComponent implements OnInit {

  private opened: boolean;
  private isAdmin: boolean;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.opened = false;
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

  public open(): void {
    this.opened = true;
  }

  public close(): void {
    this.opened = false;
  }

  public toggle(): void {
    this.opened = !this.opened;
  }
}
