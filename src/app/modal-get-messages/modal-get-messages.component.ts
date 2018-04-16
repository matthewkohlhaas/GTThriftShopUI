import {Component, Inject, ViewEncapsulation, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModalAlertContentComponent} from '../modal-alert-content/modal-alert-content.component';
import {ModalService} from '../../services/modal.service';
import {MessageService} from '../../services/message.service';
import {AccountService} from '../../services/account.service';
import {User} from '../../model/user';
import {Message} from '../../model/message';
import {Listing} from '../../model/listing';
import {UserService} from '../../services/user.service';
import {ListingService} from '../../services/listing.service';
import {ValidationUtils} from '../../utils/validation.utils';


@Component({
  selector: 'app-modal-get-messages',
  templateUrl: './modal-get-messages.component.html',
  styleUrls: ['./modal-get-messages.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalGetMessagesComponent implements OnInit {

  private messages: Message[];
  private currentUserId: string;
  private listing: Listing;
  private message: string;
  private users: User[];
  private recipient: User;

  private submitDisabled = false;
  private userSelected = false;

  constructor(
    private modalService: ModalService,
    private userService: UserService,
    private accountService: AccountService,
    private messageService: MessageService,
    private listingService: ListingService,
    public dialogRef: MatDialogRef<ModalAlertContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.listing = this.data.listing;
    this.currentUserId = this.accountService.getCurrentUserFromToken()._id;
    this.loadUsers();
  }

  private close(): void {
    this.dialogRef.close();
  }

  private getMessages(): void {
    this.userSelected = true;
    if (this.recipient) {
      this.messageService.findMessages(this.listing, this.recipient._id, this.currentUserId).subscribe( res => {
        this.messages = res;
      });
    }
  }

  private loadUsers(): void {
    this.userService.getUsers(this.currentUserId).subscribe(res => {
      this.users = res;
    });
  }

  private selectUser(): void {
    this.userSelected = false;
  }

  private onReply(): void {
    if (this.messages.length > 1) {
      if (!this.data  || !ValidationUtils.validateNotEmpty(this.message)) {
        return;
      }
      this.submitDisabled = true;
      this.messageService.sendMessage(this.listing, this.currentUserId, this.recipient._id, this.message, msg => {
        let title = 'Failed to send message';
        if (msg.successful) {
          this.close();
          title = 'Successfully sent message';
        }
        this.modalService.openAlertModal(title, msg.text, () => this.submitDisabled = false);
      });
    } else {
      const title = 'Failed to send message';
        this.close();
      this.modalService.openAlertModal(title, 'This user has not messaged you about your listing.',
        () => this.submitDisabled = false);
    }
  }
}

