import {Component, ViewEncapsulation, EventEmitter, Output, OnInit} from '@angular/core';
import Timer = NodeJS.Timer;
import {FloatLabelType} from '@angular/material';

const SEARCH_FIELD_DELAY = 500;

const SORT_OBJECTS: object[] = [
  { text: 'Price: Low to High', params: { sort: 'price', direction: 'ascending' } },
  { text: 'Price: High to Low', params: { sort: 'price', direction: 'descending' } },
  { text: 'Seller Rating', params: { sort: 'userRating', direction: 'descending' } },
  { text: 'Date: Most Recent', params: { sort: 'createdAt', direction: 'descending' } },
  { text: 'Date: Least Recent', params: { sort: 'createdAt', direction: 'ascending' } }
];

const CATEGORY_OBJECTS: object[] = [
  { text: 'All', value: 'all' }
];

@Component({
  selector: 'app-listings-feed-toolbar',
  templateUrl: './listings-feed-toolbar.component.html',
  styleUrls: ['./listings-feed-toolbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListingsFeedToolbarComponent implements OnInit {

  @Output() listEvent = new EventEmitter<string>();

  private searchString;
  private categoryObjects: any[] = CATEGORY_OBJECTS;
  private selectedCategory: any;
  private sortObjects: any[] = SORT_OBJECTS;
  private selectedSort: any;

  private searchTimeout: any;

  constructor() { }

  ngOnInit() {
    if (this.categoryObjects && this.categoryObjects[0]) {
      this.selectedCategory = this.categoryObjects[0].value;
    }
    if (this.sortObjects && this.sortObjects[3]) {
      this.selectedSort = this.sortObjects[3].params;
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

  public addSortParams(params: object) {
    if (this.selectedSort) {
      for (const key in this.selectedSort) {
        if (this.selectedSort.hasOwnProperty(key)) {
          params[key] = this.selectedSort[key];
        }
      }
    }
  }

  public addCategoryParams(params: object) {
    if (this.selectedCategory) {
      params['category'] = this.selectedCategory;
    }
  }

  private onSearchFieldKeyUp() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => this.list(), SEARCH_FIELD_DELAY);
  }

  private list() {
    this.listEvent.next('');
  }
}
