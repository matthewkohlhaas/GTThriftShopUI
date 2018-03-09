import {Component, OnInit, ViewChild} from '@angular/core';
import {Listing} from '../../model/listing';
import {ListingService} from '../../services/listing.service';
import {ModalFlagListingContentComponent} from '../modal-flag-listing-content/modal-flag-listing-content.component';
import {FlagService} from '../../services/flag.service';
import {ModalService} from '../../services/modal.service';
import {ListingToolbarComponent} from '../listing-toolbar/listing-toolbar.component';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent implements OnInit {

  @ViewChild(ListingToolbarComponent) toolbar;
  listings: Listing[];

  constructor(
    private modalService: ModalService,
    private listingService: ListingService,
    private flagService: FlagService
  ) {}

  ngOnInit(): void {
    const params: object = { sort: 'createdAt', direction: 'descending' };
    this.listingService.getListings(params).subscribe(res => {
      this.listings = res;
    });
  }

  list(): void {
    const params: object = this.buildParams();
    this.listingService.getListings(params).subscribe(res => {
      this.listings = res;
    });
  }

  private buildParams(): object {
    const params: object = {};
    this.toolbar.addSortParams(params);
    this.toolbar.addCategoryParams(params);
    return params;
  }

  private openFlagModal(listing): void {
    this.modalService.openModal<ModalFlagListingContentComponent>(ModalFlagListingContentComponent,
      {listing: listing});
  }

}
