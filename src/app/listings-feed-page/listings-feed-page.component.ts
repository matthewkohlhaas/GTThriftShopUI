import {Component, OnInit, ViewChild} from '@angular/core';
import {Listing} from '../../model/listing';
import {ListingService} from '../../services/listing.service';
import {ModalFlagListingContentComponent} from '../modal-flag-listing-content/modal-flag-listing-content.component';
import {ModalService} from '../../services/modal.service';
import {ListingsFeedToolbarComponent} from '../listings-feed-toolbar/listings-feed-toolbar.component';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {AccountService} from "../../services/account.service";
import {ModalEditListingContentComponent} from "../modal-edit-listing-content/modal-edit-listing-content.component";
import {ListingsToolbarService} from '../../services/listings-toolbar.service';


@Component({
  selector: 'app-listings-feed-page',
  templateUrl: './listings-feed-page.component.html',
  styleUrls: ['./listings-feed-page.component.css']
})
export class ListingsFeedPageComponent implements OnInit {

  listings: Listing[];

  searchString: string;
  selectedCategory: string;
  selectedSort: string;

  private currentUser: User;

  constructor(
    private modalService: ModalService,
    private listingService: ListingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private listingsToolbarService: ListingsToolbarService
  ) {}

  ngOnInit(): void {
    this.listingsToolbarService.currentMessage.subscribe(message => this.listingToolbarChange(message));
    this.activatedRoute.queryParams.subscribe((params) => {
      this.accountService.getCurrentUser().subscribe(value => {
        this.currentUser = value;
      });
      this.getListings(params);
    });
  }

  public list(): void {
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
    this.addCategoryParams(params);
    this.addSearchParams(params);
    this.addSortParams(params);
    return params;
  }

  public addCategoryParams(params: object) {
    if (this.selectedCategory) {
      params['category'] = this.selectedCategory;
    }
  }

  public addSearchParams(params: object) {
    if (this.searchString) {
      const trimmedString: string = this.searchString.trim();
      if (trimmedString !== '') {
        params['search'] = trimmedString;
      }
    }
  }

  public addSortParams(params: any) {
    if (this.selectedSort) {
      for (const key in this.selectedSort) {
        if (this.selectedSort.hasOwnProperty(key)) {
          params[key] = this.selectedSort[key];
        }
      }
    }
  }

  private openEditListingModal(currentListing): void {
    this.modalService.openModal(ModalEditListingContentComponent, {listing: currentListing});
  }

  private openFlagModal(listing): void {
    this.modalService.openModal<ModalFlagListingContentComponent>(ModalFlagListingContentComponent,
      {listing: listing});
  }

  private listingToolbarChange(message: object): void {
    this.selectedCategory = message['category'];
    this.searchString = message['search'];
    this.selectedSort = message['sort'];
    this.list();
  }

}
