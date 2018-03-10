import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';
import {User} from '../../model/user';
import {ModalService} from '../../services/modal.service';
import {ValidationUtils} from '../../utils/validation.utils';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {

  private editProfileEnabled = false;

  private user: User;
  private firstName: string;
  private lastName: string;
  private profilePictureUrl: string;
  private profileBio: string;

  constructor(private accountService: AccountService, private router: Router, private modalService: ModalService) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe(value => {
      this.user = value;
    }, err => {
      this.router.navigate(['']);
    });
  }

  private editProfile(): void {
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.profilePictureUrl = this.user.profilePictureUrl;
    this.profileBio = this.user.profileBio;
    this.editProfileEnabled = true;
  }

  private done(): void {
    this.updateFirstName()
      .then(() => this.updateLastName())
      .then(() => this.updatePictureUrl())
      .then(() => this.updateProfileBio())
      .then(() => this.editProfileEnabled = false)
      .catch(() => this.editProfileEnabled = false);
  }

  private updateFirstName(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!ValidationUtils.validateNotEmpty(this.firstName)) {
        reject();
      } else if (this.firstName === this.user.firstName) {
        resolve();
      } else {
        this.accountService.updateFirstName(this.firstName, msg => {
          if (!msg.successful) {
            this.modalService.openAlertModal('Failed to update first name.', msg.text);
            reject();
          } else {
            this.user.firstName = this.firstName;
            resolve();
          }
        });
      }
    });
  }

  private updateLastName(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!ValidationUtils.validateNotEmpty(this.lastName)) {
        reject();
      } else if (this.lastName === this.user.lastName) {
        resolve();
      } else {
        this.accountService.updateLastName(this.lastName, msg => {
          if (!msg.successful) {
            this.modalService.openAlertModal('Failed to update last name.', msg.text);
            reject();
          } else {
            this.user.lastName = this.lastName;
            resolve();
          }
        });
      }
    });
  }

  private updatePictureUrl(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.profilePictureUrl === this.user.profilePictureUrl) {
        resolve();
      } else {
        this.accountService.updateProfilePictureUrl(this.profilePictureUrl, msg => {
          if (!msg.successful) {
            this.modalService.openAlertModal('Failed to update profile picture.', msg.text);
            reject();
          } else {
            this.user.profilePictureUrl = this.profilePictureUrl;
            resolve();
          }
        });
      }
    });
  }

  private updateProfileBio(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.profileBio === this.user.profileBio) {
        resolve();
      } else {
        this.accountService.updateProfileBio(this.profileBio, msg => {
          if (!msg.successful) {
            this.modalService.openAlertModal('Failed to update profile bio.', msg.text);
            reject();
          } else {
            this.user.profileBio = this.profileBio;
            resolve();
          }
        });
      }
    });
  }
}
