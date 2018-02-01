import {Component, OnInit} from '@angular/core';
import {Listing} from '../../model/listing';
import {ListingService} from '../../services/listing.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listing-view',
  templateUrl: './listing-view.component.html',
  styleUrls: ['./listing-view.component.css'],
})
export class ListingViewComponent implements OnInit {
  listings: Listing[];
  listing1: Listing;
  constructor(private router: Router, private listingService: ListingService) { }

  ngOnInit() {
    this.listingService.getListings().subscribe(res => {
      this.listings = res;
      this.listing1 = this.listings[4];
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['']);
      }
    });
  }

}
