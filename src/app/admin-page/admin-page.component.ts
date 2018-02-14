import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {AccountService} from '../../services/account.service';
import {ModalService} from '../../services/modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPageComponent implements OnInit {

  private adminEmail: string;
  private userToBanEmail: string;
  private userToUnbanEmail: string;

  private registerAdminDisabled = false;
  private banUserDisabled = false;
  private unbanUserDisabled = false;

  constructor(private adminService: AdminService,
              private accountService: AccountService,
              private router: Router,
              private modalService: ModalService) { }

  ngOnInit() {
    this.accountService.authenticate(isAuthenticated => {
      if (isAuthenticated) {
        return;
      } else {
        this.router.navigate(['']);
      }
    });
  }

  private registerAdmin(): void {
    if (!this.validateEntry(this.adminEmail)) {
      return;
    }
    this.registerAdminDisabled = true;
    this.adminService.registerAdmin(this.adminEmail)
      .subscribe(res => {
        this.modalService.displayModal('Successful', res.text);
        this.registerAdminDisabled = false;
      }, err => {
        if (err.status === 0) {
          this.modalService.displayModal('Unsuccessful', 'Failed to connect to server.');
        } else {
          this.modalService.displayModal('Unsuccessful', err.error);
        }
        this.registerAdminDisabled = false;
      }
    );
  }

  private banUser(): void {
    if (!this.validateEntry(this.userToBanEmail)) {
      return;
    }
    this.banUserDisabled = true;
    this.adminService.banUser(this.userToBanEmail)
      .subscribe(res => {
          this.modalService.displayModal('Successful', res.text);
          this.banUserDisabled = false;
        }, err => {
          if (err.status === 0) {
            this.modalService.displayModal('Unsuccessful', 'Failed to connect to server.');
          } else {
            this.modalService.displayModal('Unsuccessful', err.error);
          }
          this.banUserDisabled = false;
        }
      );
  }

  private unbanUser(): void {
    if (!this.validateEntry(this.userToUnbanEmail)) {
      return;
    }
    this.unbanUserDisabled = true;
    this.adminService.unbanUser(this.userToUnbanEmail)
      .subscribe(res => {
          this.modalService.displayModal('Successful', res.text);
          this.unbanUserDisabled = false;
        }, err => {
          if (err.status === 0) {
            this.modalService.displayModal('Unsuccessful', 'Failed to connect to server.');
          } else {
            this.modalService.displayModal('Unsuccessful', err.error);
          }
          this.unbanUserDisabled = false;
        }
      );
  }

  private validateEntry(entry): boolean {
    if (AccountService.validateNotEmpty(entry)) {
      return true;
    }
    this.modalService.displayModal('Unsuccessful', 'Please enter an email address.');
    return false;
  }
}
