import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Listing} from '../../model/listing';
import {ListingService} from '../../services/listing.service';
import {ActivatedRoute, Params} from '@angular/router';
import {User} from '../../model/user';
import {AccountService} from '../../services/account.service';
import {ModalService} from '../../services/modal.service';
import {ModalEditListingContentComponent} from '../modal-edit-listing-content/modal-edit-listing-content.component';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css'],
})
export class ListingPageComponent implements OnInit {

  private currentUser: User;
  private listing: Listing;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private listingService: ListingService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadListing();
    this.accountService.getCurrentUser().subscribe(value => this.currentUser = value);
  }

  private loadListing(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.listingService.getListing(params['id']).subscribe(value => this.listing = value);
    });
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
    const listing = Object.assign({}, this.listing);
    this.modalService.openModal(ModalEditListingContentComponent, {listing: listing}, () => {
      this.loadListing();
    });
  }
}
