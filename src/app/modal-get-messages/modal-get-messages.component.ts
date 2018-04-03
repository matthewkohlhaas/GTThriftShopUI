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
import {UserService} from '../../services/user.service';
import {ListingService} from '../../services/listing.service';


@Component({
  selector: 'app-modal-get-messages',
  templateUrl: './modal-get-messages.component.html',
  styleUrls: ['./modal-get-messages.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalGetMessagesComponent implements OnInit {

  private submitDisabled = false;

  private message: string;
  private messages: Message[];
  private currentUserId: string;
  private currentUser: User;
  private listing: Listing;

  constructor(
    private modalService: ModalService,
    private userService: UserService,
    private accountService: AccountService,
    private messageService: MessageService,
    public dialogRef: MatDialogRef<ModalAlertContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.listing = this.data.listing;
    this.currentUserId = this.accountService.getCurrentUserFromToken()._id;
    this.getAllMessages();
  }

  private close(): void {
    this.dialogRef.close();
  }

  private getAllMessages(): void {
    this.messageService.getMessagesAboutListing(this.listing, this.currentUserId).subscribe(res => {
      this.messages = res;
    });
  }
}

