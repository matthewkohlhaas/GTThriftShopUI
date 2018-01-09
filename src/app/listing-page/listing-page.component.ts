import {Component, OnInit} from '@angular/core';
import {Listing} from '../../model/listing';
import {MOCK_LISTINGS} from '../../mock/mock-listings';
import {ListingService} from '../../services/listing.service';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent implements OnInit {

  listings: Listing[];

  constructor(private listingService: ListingService) {}

  ngOnInit() {
    this.listingService.getListings().subscribe(listings => this.listings = listings);
  }
}
