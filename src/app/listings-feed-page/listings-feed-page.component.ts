import {Component, OnInit} from '@angular/core';
import {Listing} from '../../model/listing';
import {ListingService} from '../../services/listing.service';
import {ModalFlagListingContentComponent} from '../modal-flag-listing-content/modal-flag-listing-content.component';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-listings-feed-page',
  templateUrl: './listings-feed-page.component.html',
  styleUrls: ['./listings-feed-page.component.css']
})
export class ListingsFeedPageComponent implements OnInit {
  listings: Listing[];

  constructor(
    private modalService: ModalService,
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
    this.listingService.getListings().subscribe(res => {
      this.listings = res;
    });
  }

  private openFlagModal(listing): void {
    this.modalService.openModal<ModalFlagListingContentComponent>(ModalFlagListingContentComponent,
      {listing: listing});
  }
}
