import {Component, OnInit, ViewChild} from '@angular/core';
import {Listing} from '../../model/listing';
import {ListingService} from '../../services/listing.service';
import {ModalFlagListingContentComponent} from '../modal-flag-listing-content/modal-flag-listing-content.component';
import {ModalService} from '../../services/modal.service';
import {ListingsFeedToolbarComponent} from '../listings-feed-toolbar/listings-feed-toolbar.component';
import {ModalMessageUserContentComponent} from '../modal-message-user-content/modal-message-user-content.component';
import {ActivatedRoute, Router} from '@angular/router';

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
    private listingService: ListingService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.getListings(params);
    });
  }

  list(): void {
    const params: object = this.buildParams();
    console.log(params);
    this.router.navigate(['/listings'], {queryParams: params});
    this.getListings(params);
  }

  private getListings(params: object): void {
    this.listingService.getListings(params).subscribe(res => {
      this.listings = res;
      this.searchString = params['search'];
      this.selectedCategory = params['category'];
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

  private openMessageModal(listing): void {
    this.modalService.openModal<ModalMessageUserContentComponent>(ModalMessageUserContentComponent,
      {listing: listing});
  }
}
