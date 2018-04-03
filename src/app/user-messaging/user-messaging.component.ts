import {Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ModalMessagingContentComponent} from '../modal-messaging-content/modal-messaging-content.component';
import {ModalGetMessagesComponent} from '../modal-get-messages/modal-get-messages.component';
import {ModalService} from '../../services/modal.service';
import {MessageService} from '../../services/message.service';
import {AccountService} from '../../services/account.service';
import {Message} from '../../model/message';
import {Listing} from '../../model/listing';
import {User} from '../../model/user';
import {ListingService} from '../../services/listing.service';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-user-messaging',
  templateUrl: './user-messaging.component.html',
  styleUrls: ['./user-messaging.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserMessagingComponent implements OnInit {


  private messages: Message[];
  private currentUserId: string;
  private currentUser: User;
  private users: User[];
  private recipient: User;
  private listings: Listing[];
  private listing: Listing;
  private listingId: string;

  constructor(
    private modalService: ModalService,
    private listingService: ListingService,
    private messageService: MessageService,
    private accountService: AccountService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.currentUserId = this.accountService.getCurrentUserFromToken()._id;
    this.accountService.getCurrentUser().subscribe(value => this.currentUser = value);
    this.loadUsers();
    this.getMessages();
  }

  private loadUsers(): void {
    this.userService.getUsers(this.currentUserId).subscribe(res => {
      this.users = res;
    });
  }

  private loadListings(): void {
    if (this.currentUserId) {
      this.listingService.getAllListingsBetweenUsers(this.recipient._id, this.currentUserId).subscribe( res => {
        this.listings = res;
      });
    }
  }

  private loadListing(): void {
    this.listingService.getListing(this.listingId).subscribe(value => this.listing = value);
  }

  private getMessages(): void {
    this.messageService.getAllMessagesForUser(this.currentUserId).subscribe( res => {
      this.messages = res;
    });
  }

  private openSendMessageModal(): void {
    this.modalService.openModal<ModalMessagingContentComponent>(ModalMessagingContentComponent);
  }

  private viewAllMessagesModal(listing): void {
    this.modalService.openModal<ModalGetMessagesComponent>(ModalGetMessagesComponent, {listing: listing});
  }
}
