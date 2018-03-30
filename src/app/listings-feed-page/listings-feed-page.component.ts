import {Component, OnInit, ViewChild} from '@angular/core';
import {Listing} from '../../model/listing';
import {ListingService} from '../../services/listing.service';
import {ModalFlagListingContentComponent} from '../modal-flag-listing-content/modal-flag-listing-content.component';
import {ModalService} from '../../services/modal.service';
import {ListingsFeedToolbarComponent} from '../listings-feed-toolbar/listings-feed-toolbar.component';

@Component({
  selector: 'app-listings-feed-page',
  templateUrl: './listings-feed-page.component.html',
  styleUrls: ['./listings-feed-page.component.css']
})
export class ListingsFeedPageComponent implements OnInit {

  @ViewChild(ListingsFeedToolbarComponent) toolbar;
  listings: Listing[];

  searchString: string;
  selectedCategory: string;

  constructor(
    private modalService: ModalService,
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    const params: object = this.buildParams();
    this.listingService.getListings(params).subscribe(res => {
      this.listings = res;
      this.searchString = this.toolbar.getSearchString();
      this.selectedCategory = this.toolbar.getSelectedCategory();
    });
  }

  private hasSearchString(): boolean {
    return this.searchString && this.searchString.length > 0;
  }

  private selectedCategoryIsNotAll(): boolean {
    return this.selectedCategory && this.selectedCategory !== 'all';
  }

  private buildParams(): object {
    const params: object = {};
    this.toolbar.addSearchParams(params);
    this.toolbar.addSortParams(params);
    this.toolbar.addCategoryParams(params);
    return params;
  }

  private openFlagModal(listing): void {
    this.modalService.openModal<ModalFlagListingContentComponent>(ModalFlagListingContentComponent,
      {listing: listing});
  }
}
