import {Component, Inject, ViewEncapsulation, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModalAlertContentComponent} from '../modal-alert-content/modal-alert-content.component';
import {ModalService} from '../../services/modal.service';
import {MessageService} from '../../services/message.service';
import {AccountService} from '../../services/account.service';
import {ValidationUtils} from '../../utils/validation.utils';
import {Listing} from '../../model/listing';
import {User} from '../../model/user';
import {Message} from '../../model/message';

@Component({
  selector: 'app-modal-message-user-content',
  templateUrl: './modal-message-user-content.component.html',
  styleUrls: ['./modal-message-user-content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalMessageUserContentComponent implements OnInit {

  private submitDisabled = false;
  private currentUser: User;
  private message: string;

  constructor(
    private modalService: ModalService,
    private messageService: MessageService,
    private accountService: AccountService,
    public dialogRef: MatDialogRef<ModalAlertContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe(res => this.currentUser = res);
  }

  private close(): void {
    this.dialogRef.close();
  }

  private onSubmit(): void {
    if (!this.data.listing || !ValidationUtils.validateNotEmpty(this.message)) {
      return;
    }
    this.submitDisabled = true;
    this.messageService.sendMessage(this.data.listing, this.data.listing.user, this.currentUser, this.message, msg => {
      let title = 'Failed to send message';
      if (msg.successful) {
        title = 'Successfully sent message';
        this.close();
      }
      this.modalService.openAlertModal(title, msg.text, () => this.submitDisabled = false);
    });
  }

}
