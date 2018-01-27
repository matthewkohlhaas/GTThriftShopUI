import {Component, OnInit} from '@angular/core';
import {Listing} from '../../model/listing';
import {ListingService} from '../../services/listing.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent implements OnInit {

  listings: Listing[];

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.listings = [];

    const response: Observable<Listing[]> = this.listingService.getListings();

    if (response) {
      response.subscribe(listings => this.listings = listings);
    }
  }
}
