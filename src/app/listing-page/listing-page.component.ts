import {Component, OnInit, ViewChild} from '@angular/core';
import {Listing} from '../../model/listing';
import {ListingService} from '../../services/listing.service';
import {ListingToolbarComponent} from '../listing-toolbar/listing-toolbar.component';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent implements OnInit {

  @ViewChild(ListingToolbarComponent) toolbar;
  listings: Listing[];

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    const params = { sort: 'createdAt', direction: 'descending' };
    this.listingService.getListings(params).subscribe(res => {
      this.listings = res;
    });
  }

  list(): void {
    const params = this.buildParams();
    this.listingService.getListings(params).subscribe(res => {
      this.listings = res;
    });
  }

  private buildParams(): Object {
    const params: Object = {};
    this.toolbar.addSortParams(params);
    this.toolbar.addCategoryParams(params);
    return params;
  }

}
