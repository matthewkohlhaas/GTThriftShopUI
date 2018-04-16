import {Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ModalMessagingContentComponent} from '../modal-messaging-content/modal-messaging-content.component';
import {ModalGetMessagesComponent} from '../modal-get-messages/modal-get-messages.component';
import {ModalService} from '../../services/modal.service';
import {MessageService} from '../../services/message.service';
import {AccountService} from '../../services/account.service';
import {User} from '../../model/user';
import {ListingService} from '../../services/listing.service';
import {Listing} from '../../model/listing';

@Component({
  selector: 'app-user-messaging-page',
  templateUrl: './user-messaging.page.component.html',
  styleUrls: ['./user-messaging.page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserMessagingPageComponent implements OnInit {


  private currentUserId: string;
  private currentUser: User;
  private listings: Listing[];


  constructor(private modalService: ModalService,
              private listingService: ListingService,
              private messageService: MessageService,
              private accountService: AccountService, ) {
  }

  ngOnInit() {
    this.currentUserId = this.accountService.getCurrentUserFromToken()._id;
    this.accountService.getCurrentUser().subscribe(value => this.currentUser = value);
    this.getListings();
  }

  private getListings(): void {
    this.listingService.getAllListingsForUser(this.currentUserId).subscribe( res => {
      this.listings = res;
    });
  }

  private viewAllMessagesModal(listing): void {
    this.modalService.openModal<ModalGetMessagesComponent>(ModalGetMessagesComponent, {listing: listing});
  }
}
