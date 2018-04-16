import {Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from '../../model/user';
import {ModalService} from '../../services/modal.service';
import {ListingService} from '../../services/listing.service';
import {AccountService} from '../../services/account.service';
import {Listing} from '../../model/listing';
import {OfferService} from '../../services/offer.service';

@Component({
  selector: 'app-user-messaging-page',
  templateUrl: './user-messaging.page.component.html',
  styleUrls: ['./user-messaging.page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserMessagingPageComponent implements OnInit {

  private user: User;

  constructor(
    private modalService: ModalService,
    private listingService: ListingService,
    private offerService: OfferService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.accountService.getCurrentUser().subscribe(user => {
      this.user = user;
      if (user && user.offers) {
        for (const offer of user.offers) {
          offer.user = user;
          this.listingService.getListing(offer.listing.toString()).subscribe(listing => offer.listing = listing);
        }
      }
    });
  }

  private loadMessages(index: string): void {
    this.offerService.getMessages(this.user.offers[index]._id)
      .subscribe(messages => this.user.offers[index].messages = messages);
  }
}
