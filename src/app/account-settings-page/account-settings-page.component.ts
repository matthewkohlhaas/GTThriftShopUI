import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UserService} from "../../services/user.service";
import {AccountService} from "../../services/account.service";
import {User} from "../../model/user";
import {ModalService} from "../../services/modal.service";
import {ModalAlertContentComponent} from "../modal-alert-content/modal-alert-content.component";

@Component({
  selector: 'app-account-settings-page',
  templateUrl: './account-settings-page.component.html',
  styleUrls: ['./account-settings-page.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AccountSettingsPageComponent implements OnInit{

  private currentUser : User;
  private blockedList : User[] = [];
  private submitDisabled = false;


  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private modalService: ModalService

  ) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe((value => {
      this.currentUser = value;
      this.blockedList = this.currentUser.blockedUsers;

      for (let i = 0; i < this.blockedList.length; i++) {
        this.userService.getUserById(this.blockedList[i].toString()).subscribe(value => {
          this.blockedList[i] = value;
        });
      }

    }));
  }

  private onSubmit(user: User): void {

    // this.submitDisabled = true;
    //
    // this.accountService.unblockedUser(user._id, msg => {
    //   let title = 'Failed to unblock user';
    //   if (msg.successful) {
    //     title = 'Successfully unblocked user';
    //   }
    //   //this.modalService.openAlertModal(title, msg.text, () => this.submitDisabled = false);
    // });
  }
}

