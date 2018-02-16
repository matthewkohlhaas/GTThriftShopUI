import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {AdminService} from '../../services/admin.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from '../modal-content/modal-content.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavMenuComponent implements OnInit {

  private isAdmin = false;

  constructor(private accountService: AccountService,
              private modalService: NgbModal,
              private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.isAdmin().subscribe(res => {
      this.isAdmin = res;
    });
  }

  private logout(): void {
    this.accountService.logout();
  }
}
