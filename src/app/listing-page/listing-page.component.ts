import {Component, OnInit} from '@angular/core';
import {Listing} from '../../model/listing';
import {ListingService} from '../../services/listing.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent implements OnInit {

  listings: Listing[];

  constructor(private router: Router, private listingService: ListingService) {}

  ngOnInit(): void {
    this.listingService.getListings().subscribe(res => {
      this.listings = res;
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['']);
      }
    });
  }
}
