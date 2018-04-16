import {Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from '../../model/user';
import {ModalService} from '../../services/modal.service';
import {ListingService} from '../../services/listing.service';
import {AccountService} from '../../services/account.service';
import {Listing} from '../../model/listing';
import {OfferService} from '../../services/offer.service';
import {Offer} from '../../model/offer';

@Component({
  selector: 'app-user-offers-page',
  templateUrl: './user-offers-page.component.html',
  styleUrls: ['./user-offers-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserOffersPageComponent implements OnInit {

  user: User;
  listingOffers: Offer[] = [];

  constructor(
    private modalService: ModalService,
    private listingService: ListingService,
    private offerService: OfferService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.accountService.getCurrentUser().subscribe(user => {
      this.user = user;
      if (user) {
        if (user.offers) {
          for (const offer of user.offers) {
            offer.user = user;
            this.listingService.getListing(offer.listing.toString()).subscribe(listing => offer.listing = listing);
          }
        }
        if (user.listings) {
          this.listingOffers = [];
          for (const listing of user.listings) {
            this.listingService.getOffers(listing._id).subscribe(offers => {
              for (const offer of offers) {
                offer.listing = listing;
                offer.listing.user = user;
                this.listingOffers.push(offer);
              }
            });
          }
        }
      }
    });
  }

  private loadMessages(offer: Offer): void {
    this.offerService.getMessages(offer._id).subscribe(messages => offer.messages = messages);
  }
}
