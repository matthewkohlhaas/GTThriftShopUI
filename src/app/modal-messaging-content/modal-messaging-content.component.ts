import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModalAlertContentComponent} from '../modal-alert-content/modal-alert-content.component';
import {ModalService} from '../../services/modal.service';
import {UserService} from '../../services/user.service';
import {ListingService} from '../../services/listing.service';
import {AccountService} from '../../services/account.service';
import {MessageService} from '../../services/message.service';
import {User} from '../../model/user';
import {Listing} from '../../model/listing';
import {Message} from '../../model/message';
import {ValidationUtils} from '../../utils/validation.utils';

@Component({
  selector: 'app-modal-messaging-content',
  templateUrl: './modal-messaging-content.component.html',
  styleUrls: ['./modal-messaging-content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalMessagingContentComponent implements OnInit {

  private submitDisabled = false;
  private messagesShowing = false;

  private message: string;
  private messages: Message[];
  private currentUserId: string;
  private currentUser: User;
  private recipient: User;
  private listing: Listing;
  private listings: Listing[];

  constructor(
    private modalService: ModalService,
    private userService: UserService,
    private accountService: AccountService,
    private listingService: ListingService,
    private messageService: MessageService,
    public dialogRef: MatDialogRef<ModalAlertContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {
    this.recipient = this.data.user;
    this.currentUserId = this.accountService.getCurrentUserFromToken()._id;
    this.accountService.getCurrentUser().subscribe(value => this.currentUser = value);
    this.loadRecipientListings();
  }

  private close(): void {
    this.dialogRef.close();
  }

  private getMessages(): void {
    if (this.listing) {
      this.messageService.findMessages(this.listing, this.recipient._id, this.currentUserId).subscribe( res => {
        this.messages = res;
      });
      this.messagesShowing = true;
    }
  }

  private loadRecipientListings(): void {
    this.listingService.getAllListingsForUser(this.recipient._id).subscribe( res => {
      this.listings = res;
    });
  }

  private onSubmit(): void {
    if (!this.data || !this.data.user || !ValidationUtils.validateNotEmpty(this.message)) {
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
  }
}
