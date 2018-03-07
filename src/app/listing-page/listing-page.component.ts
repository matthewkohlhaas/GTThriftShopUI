import {Component, OnInit} from '@angular/core';
import {Listing} from '../../model/listing';
import {ListingService} from '../../services/listing.service';

const SORT_OBJECTS = [
  { text: 'Price: Low to High', params: { sort: 'price', direction: 'ascending' } },
  { text: 'Price: High to Low', params: { sort: 'price', direction: 'descending' } },
  { text: 'Seller Rating', params: { sort: 'userRating', direction: 'descending' } },
  { text: 'Date: Most Recent', params: { sort: 'createdAt', direction: 'descending' } },
  { text: 'Date: Least Recent', params: { sort: 'createdAt', direction: 'ascending' } }
];

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent implements OnInit {

  private categories: string[] = ['all'];
  private selectedCategory: string;
  private sorts: Object[] = SORT_OBJECTS;
  private selectedSort: Object;

  listings: Listing[];

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.selectedCategory = this.categories[0];
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
    this.addSortParams(params);
    this.addCategoryParams(params);
    return params;
  }

  private addSortParams(params: Object) {
    if (this.selectedSort) {
      for (const key in this.selectedSort) {
        if (this.selectedSort.hasOwnProperty(key)) {
          params[key] = this.selectedSort[key];
        }
      }
    }
  }

  private addCategoryParams(params: Object) {
    if (this.selectedCategory) {
      params['category'] = this.selectedCategory;
    }
  }

}
