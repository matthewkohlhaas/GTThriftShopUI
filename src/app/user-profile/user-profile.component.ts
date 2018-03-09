import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

  private user: User;

  private firstName: string;
  private lastName: string;
  private profilePictureUrl: string;
  private profileBio: string;

  private editProfileBoolean = false;


  constructor(private accountService: AccountService, private router: Router, private modalService: ModalService) {
  }

  ngOnInit(): void {

    this.accountService.getCurrentUser().subscribe(res => {
      this.user = res;
    }, err => {
      this.router.navigate(['']);
    });
  }

  private editProfile(): void {
    this.editProfileBoolean = true;
  }

  private done(): void {
    this.editProfileBoolean = false;
  }

  private updateFirstName(): void {
    if (!ValidationUtils.validateNotEmpty(this.firstName)) {
      return;
    }
    this.accountService.updateFirstName(this.firstName,  msg => {
      let title = 'Failed to update first name.';
      if (msg.successful) {
        title = 'Successfully updated first name.';
        this.user.firstName = this.firstName;
      }
        this.modalService.openAlertModal(title, msg.text);
      });
  }

  private updateLastName(): void {
    if (!ValidationUtils.validateNotEmpty(this.lastName)) {
      return;
    }
    this.accountService.updateLastName(this.lastName,  msg => {
      let title = 'Failed to update last name.';
      if (msg.successful) {
        title = 'Successfully updated last name.';
        this.user.lastName = this.lastName;
      }
      this.modalService.openAlertModal(title, msg.text);
      });
  }

  private updatePictureUrl(): void {
    if (!ValidationUtils.validateNotEmpty(this.profilePictureUrl)) {
      return;
    }
    this.accountService.updateProfilePictureUrl(this.profilePictureUrl,  msg => {
      let title = 'Failed to update profile picture.';
      if (msg.successful) {
        title = 'Successfully updated profile picture.';
        this.user.profilePictureUrl = this.profilePictureUrl;
      }
      this.modalService.openAlertModal(title, msg.text);
      });
  }

  private updateProfileBio() {
    if (!ValidationUtils.validateNotEmpty(this.profileBio)) {
      return;
    }
    this.accountService.updateProfileBio(this.profileBio,  msg => {
      let title = 'Failed to update profile bio.';
      if (msg.successful) {
        title = 'Successfully updated profile bio.';
        this.user.profileBio = this.profileBio;
      }
      this.modalService.openAlertModal(title, msg.text);
      });
  }

}
