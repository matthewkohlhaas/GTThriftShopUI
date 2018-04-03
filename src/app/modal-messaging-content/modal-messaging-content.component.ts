import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

  private message: string;
  private messages: Message[];
  private currentUserId: string;
  private currentUser: User;
  private recipient: User;
  private users: User[];
  private listingId: string;
  private listing: Listing;
  private listings: Listing[];


  constructor(
    private modalService: ModalService,
    private userService: UserService,
    private accountService: AccountService,
    private listingService: ListingService,
    private messageService: MessageService,
    public dialogRef: MatDialogRef<ModalAlertContentComponent>,
  ) { }


  ngOnInit() {
    this.currentUserId = this.accountService.getCurrentUserFromToken()._id;
    this.accountService.getCurrentUser().subscribe(value => this.currentUser = value);
    this.loadUsers();
  }

  private close(): void {
    this.dialogRef.close();
  }

  private getMessages(): void {
    this.messageService.getAllMessagesForUser(this.currentUserId).subscribe( res => {
      this.messages = res;
    });
  }

  // gets every user in the system besides current one for messaging purposes
  private loadUsers(): void {
    this.userService.getUsers(this.currentUserId).subscribe(res => {
      this.users = res;
    });
  }

  private loadListings(): void {
    if (this.currentUserId) {
      this.getMessages();
      if (!this.messages) {
        this.listingService.getAllListingsFromUser(this.recipient._id).subscribe( res => {
          this.listings = res;
        });
      } else {
        this.listingService.getAllListingsBetweenUsers(this.recipient._id, this.currentUserId).subscribe( res => {
          this.listings = res;
        });
      }
    }
  }

  private loadListing(): void {
    this.listingService.getListing(this.listingId).subscribe(value => this.listing = value);
  }

  private onSubmit(): void {
    if (!ValidationUtils.validateNotEmpty(this.message)) {
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
