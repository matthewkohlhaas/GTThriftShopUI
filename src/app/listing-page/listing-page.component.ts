import {Component, OnInit} from '@angular/core';
import {Listing} from '../../model/listing';
import {ListingService} from '../../services/listing.service';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent implements OnInit {

  private categories: string[] = ['all'];
  private selectedCategory: string;
  private sorts: string[] = ['price', 'date', 'rating'];
  private selectedSort: string;
  
  listings: Listing[];

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.selectedCategory = this.categories[0];
    this.listingService.getListings().subscribe(res => {
      this.listings = res;
    });
  }

}
