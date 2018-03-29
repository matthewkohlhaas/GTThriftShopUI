import {Component, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {ModalService} from '../../services/modal.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModalAlertContentComponent} from '../modal-alert-content/modal-alert-content.component';
import {User} from "../../model/user";

@Component({
  selector: 'app-modal-block-user-content',
  templateUrl: './modal-block-user-content.component.html',
  styleUrls: ['./modal-block-user-content.component.css'],
})
export class ModalBlockUserContentComponent {

  private submitDisabled = false;

  constructor(
    private modalService: ModalService,
    private accountService: AccountService,
    public dialogRef: MatDialogRef<ModalAlertContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  private close(): void {
    this.dialogRef.close();
  }

  private onSubmit(blockedUser: User, description: string): void {

    this.submitDisabled = true;

    this.accountService.updateblockProfiles(blockedUser, description, msg => {
      let title = 'Failed to block user';
      if (msg.successful) {
        title = 'Successfully blocked user';
        this.close();
      }
      this.modalService.openAlertModal(title, msg.text, () => this.submitDisabled = false);
    });
  }
}

