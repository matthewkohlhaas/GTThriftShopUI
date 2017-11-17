import {Component} from '@angular/core';
import {Listing} from '../../model/listing';
import {MOCK_LISTINGS} from '../../mock/mock-listings';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent {

  listings: Listing[] = MOCK_LISTINGS;

  constructor() {}
}
