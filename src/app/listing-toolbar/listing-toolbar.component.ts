import { Component, ViewEncapsulation, EventEmitter, Output } from '@angular/core';

const SORT_OBJECTS = [
  { text: 'Price: Low to High', params: { sort: 'price', direction: 'ascending' } },
  { text: 'Price: High to Low', params: { sort: 'price', direction: 'descending' } },
  { text: 'Seller Rating', params: { sort: 'userRating', direction: 'descending' } },
  { text: 'Date: Most Recent', params: { sort: 'createdAt', direction: 'descending' } },
  { text: 'Date: Least Recent', params: { sort: 'createdAt', direction: 'ascending' } }
];

const CATEGORY_OBJECTS = [
  { text: 'All', value: 'all' }
];

@Component({
  selector: 'app-listing-toolbar',
  templateUrl: './listing-toolbar.component.html',
  styleUrls: ['./listing-toolbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListingToolbarComponent {

  @Output() listEvent = new EventEmitter<string>();

  private categoryObjects: Object[] = CATEGORY_OBJECTS;
  private selectedCategory: string;
  private sortObjects: Object[] = SORT_OBJECTS;
  private selectedSort: Object;

  constructor() { }

  public addSortParams(params: Object) {
    if (this.selectedSort) {
      for (const key in this.selectedSort) {
        if (this.selectedSort.hasOwnProperty(key)) {
          params[key] = this.selectedSort[key];
        }
      }
    }
  }

  public addCategoryParams(params: Object) {
    if (this.selectedCategory) {
      params['category'] = this.selectedCategory;
    }
  }

  list() {
    this.listEvent.next('');
  }

}
