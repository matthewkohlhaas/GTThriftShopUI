import {Component, ViewEncapsulation, EventEmitter, Output, OnInit} from '@angular/core';
import Timer = NodeJS.Timer;
import {FloatLabelType} from '@angular/material';
import {ListingsToolbarService} from '../../services/listings-toolbar.service';
import {ConstantUtils} from '../../utils/constant.utils';

const SEARCH_FIELD_DELAY = 500;

@Component({
  selector: 'app-listings-feed-toolbar',
  templateUrl: './listings-feed-toolbar.component.html',
  styleUrls: ['./listings-feed-toolbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListingsFeedToolbarComponent implements OnInit {

  private categoryObjects: any[] = ConstantUtils.CATEGORY_OBJECTS;
  private sortObjects: any[] = ConstantUtils.SORT_OBJECTS;

  private searchString = '';
  private selectedCategory: any;
  private selectedSort: any;

  private searchTimeout: any;

  constructor(private listingsToolbarService: ListingsToolbarService) { }

  ngOnInit() {
    if (this.categoryObjects && this.categoryObjects[0]) {
      this.selectedCategory = this.categoryObjects[0].value;
    }
    if (this.sortObjects && this.sortObjects[3]) {
      this.selectedSort = this.sortObjects[3].params;
    }
  }

  private onSearchFieldKeyUp() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => this.onChange(), SEARCH_FIELD_DELAY);
  }

  private onChange() {
    const params = { category: this.selectedCategory,
                     search: this.searchString,
                     sort: this.selectedSort };
    this.listingsToolbarService.changeMessage(params);
  }

}
