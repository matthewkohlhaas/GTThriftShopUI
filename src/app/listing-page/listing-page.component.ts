import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {Listing} from '../../model/listing';
import {ActivatedRoute, Params} from '@angular/router';
import {ModalService} from '../../services/modal.service';
import {ListingService} from '../../services/listing.service';
import {AccountService} from '../../services/account.service';
import {ModalEditListingContentComponent} from '../modal-edit-listing-content/modal-edit-listing-content.component';
import {ModalFlagListingContentComponent} from '../modal-flag-listing-content/modal-flag-listing-content.component';
import {ModalMakeOfferContentComponent} from '../modal-make-offer-content/modal-make-offer-content.component';
import {Offer} from '../../model/offer';
import {OfferService} from '../../services/offer.service';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css'],
})
export class ListingPageComponent implements OnInit {

  currentUser: User;
  listing: Listing;
  offers: Offer[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private listingService: ListingService,
    private offerService: OfferService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadListing(() => this.loadOffers());
    this.accountService.getCurrentUser().subscribe(value => this.currentUser = value);
  }

  private loadListing(next?: () => void): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.listingService.getListing(params['id']).subscribe(listing => {
        this.listing = listing;
        if (next) {
          next();
        }
      });
    });
  }

  private loadOffers(): void {
    this.listingService.getOffers(this.listing._id).subscribe(offers => this.offers = offers);
  }

  private loadMessages(index: string): void {
    this.offerService.getMessages(this.offers[index]._id)
      .subscribe(messages => this.offers[index].messages = messages);
  }

  private userOwnsListing(): boolean {
    return this.currentUser
      && this.currentUser._id
      && this.listing
      && this.listing.user
      && this.listing.user._id
      && this.currentUser._id === this.listing.user._id;
  }

  private openEditListingModal(): void {
    this.openModal(ModalEditListingContentComponent, () => this.loadListing());
  }

  private openFlagModal(): void {
    this.openModal(ModalFlagListingContentComponent, () => this.loadListing());
  }

  private makeOffer(): void {
    this.openModal(ModalMakeOfferContentComponent, () => this.loadOffers());
  }

  private askQuestion(): void {

  }

  private openModal(modalContentRef: any, onClose?: () => void): void {
    const listing = Object.assign({}, this.listing);
    this.modalService.openModal(modalContentRef, {listing: listing}, onClose);
  }
}
