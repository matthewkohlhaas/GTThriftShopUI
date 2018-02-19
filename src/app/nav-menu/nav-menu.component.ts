import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {AdminService} from '../../services/admin.service';
import {LocalStorageService} from '../../services/local_storage.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavMenuComponent implements OnInit {

  private isAdmin = false;

  constructor(private accountService: AccountService,
              private adminService: AdminService) { }

  ngOnInit(): void {
    const local_value = LocalStorageService.getIsAdmin();
    if (local_value != null) {
      this.isAdmin = local_value;
      return;
    }
    this.adminService.isAdmin().subscribe(res => {
        LocalStorageService.addIsAdmin(res);
        this.isAdmin = res;
      }, err => {
        this.isAdmin = false;
    });
  }

  private logout(): void {
    this.accountService.logout();
  }

}
