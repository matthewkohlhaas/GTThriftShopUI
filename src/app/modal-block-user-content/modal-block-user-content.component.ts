import {Component, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {ModalService} from '../../services/modal.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModalAlertContentComponent} from '../modal-alert-content/modal-alert-content.component';
import {User} from '../../model/user';
import {FlagService} from '../../services/flag.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-modal-block-user-content',
  templateUrl: './modal-block-user-content.component.html',
  styleUrls: ['./modal-block-user-content.component.css'],
})
export class ModalBlockUserContentComponent {

  private readonly REASONS: string[] = [
    'User posted inappropriate content',
    'User posted spam or misleading content',
    'User has been abusive',
    'Other'
  ];
  private submitDisabled = false;

  constructor(
    private modalService: ModalService,
    private accountService: AccountService,
    private flagService: FlagService,
    private router: Router,
    public dialogRef: MatDialogRef<ModalAlertContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  private close(): void {
    this.dialogRef.close();
  }

  private onSubmit(user: User, reason: string): void {

    this.submitDisabled = true;

    // Flag user asynchronously (don't care too much about success outcome at this point)
    this.flagService.flagUser(user._id, reason);

    this.accountService.addBlockedUser(user._id, msg => {
      let title = 'Failed to block user';
      if (msg.successful) {
        title = 'Successfully blocked user';
        this.close();
      }
      this.modalService.openAlertModal(title, msg.text, () => this.onModalClose(msg.successful));
    });
  }

  private onModalClose(successful: boolean): void {
    if (successful) {
      this.submitDisabled = false;
      this.router.navigate(['']);
    }
    this.submitDisabled = false;
  }
}

