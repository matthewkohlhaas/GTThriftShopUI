import {Component, Inject, ViewEncapsulation, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModalAlertContentComponent} from '../modal-alert-content/modal-alert-content.component';
import {ModalService} from '../../services/modal.service';
import {MessageService} from '../../services/message.service';
import {AccountService} from '../../services/account.service';
import {ValidationUtils} from '../../utils/validation.utils';
import {User} from '../../model/user';
import {Message} from '../../model/message';
import {Listing} from '../../model/listing';
import {ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-modal-message-user-content',
  templateUrl: './modal-message-user-content.component.html',
  styleUrls: ['./modal-message-user-content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalMessageUserContentComponent implements OnInit {

  messages: Message[];
  submitDisabled = false;
  currentUser: User;
  currentUserId: string;
  listing: Listing;
  message: string;

  constructor(
    private modalService: ModalService,
    private messageService: MessageService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<ModalAlertContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.accountService.getCurrentUserFromToken()._id;
    this.listing = this.data.listing;
    this.loadMessages();
  }

  private close(): void {
    this.dialogRef.close();
  }

  private loadMessages(): void {
    if (!this.listing) {
      return;
    }
    this.messageService.getMessages(this.listing, this.currentUserId).subscribe(res => {
      this.messages = res;
    });
  }

  private onSubmit(): void {
    if (!this.data.listing || !ValidationUtils.validateNotEmpty(this.message)) {
      return;
    }
    this.submitDisabled = true;
    this.messageService.sendMessage(this.data.listing, this.data.listing.user, this.currentUser, this.message, msg => {
      let title = 'Failed to send message';
      if (msg.successful) {
        console.log(msg);
        title = 'Successfully sent message';
        this.close();
      }
      this.modalService.openAlertModal(title, msg.text, () => this.submitDisabled = false);
    });
  }

}
