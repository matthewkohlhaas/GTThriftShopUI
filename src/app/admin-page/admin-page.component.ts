import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {AccountService} from '../../services/account.service';
import {ModalService} from '../../services/modal.service';
import {ValidationUtils} from '../../utils/validation.utils';
import {ErrorStateMatcher} from '@angular/material';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPageComponent implements OnInit {

  private isAdmin = false;

  private adminEmail: string;
  private userToBanEmail: string;
  private userToUnbanEmail: string;

  private emailErrorStateMatcher: ErrorStateMatcher;

  private registerAdminDisabled: boolean;
  private banUserDisabled: boolean;
  private unbanUserDisabled: boolean;

  constructor(private adminService: AdminService, private modalService: ModalService) { }

  ngOnInit() {
    this.emailErrorStateMatcher = ValidationUtils.getEmailErrorStateMatcher();
    this.registerAdminDisabled = false;
    this.banUserDisabled = false;
    this.unbanUserDisabled = false;
  }

  private registerAdmin(): void {
    if (!ValidationUtils.validateEmail(this.adminEmail)) {
      return;
    }
    this.registerAdminDisabled = true;
    this.adminService.registerAdmin(this.adminEmail)
      .subscribe(res => {
        this.modalService.openAlertModal('Successful', res.text);
        this.registerAdminDisabled = false;
      }, err => {
        if (err.status === 0) {
          this.modalService.openAlertModal('Unsuccessful', 'Failed to connect to server.');
        } else {
          this.modalService.openAlertModal('Unsuccessful', err.error);
        }
        this.registerAdminDisabled = false;
      }
    );
  }

  private banUser(): void {
    if (!ValidationUtils.validateEmail(this.userToBanEmail)) {
      return;
    }
    this.banUserDisabled = true;
    this.adminService.banUser(this.userToBanEmail)
      .subscribe(res => {
          this.modalService.openAlertModal('Successful', res.text);
          this.banUserDisabled = false;
        }, err => {
          if (err.status === 0) {
            this.modalService.openAlertModal('Unsuccessful', 'Failed to connect to server.');
          } else {
            this.modalService.openAlertModal('Unsuccessful', err.error);
          }
          this.banUserDisabled = false;
        }
      );
  }

  private unbanUser(): void {
    if (!ValidationUtils.validateEmail(this.userToUnbanEmail)) {
      return;
    }
    this.unbanUserDisabled = true;
    this.adminService.unbanUser(this.userToUnbanEmail)
      .subscribe(res => {
          this.modalService.openAlertModal('Successful', res.text);
          this.unbanUserDisabled = false;
        }, err => {
          if (err.status === 0) {
            this.modalService.openAlertModal('Unsuccessful', 'Failed to connect to server.');
          } else {
            this.modalService.openAlertModal('Unsuccessful', err.error);
          }
          this.unbanUserDisabled = false;
        }
      );
  }
}
