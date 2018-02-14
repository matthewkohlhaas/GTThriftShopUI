import {Component, OnInit} from '@angular/core';
import {Listing} from '../../model/listing';
import {ListingService} from '../../services/listing.service';
import {Router} from '@angular/router';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent implements OnInit {

  listings: Listing[];

  constructor(private router: Router, private accountService: AccountService, private listingService: ListingService) {}

  ngOnInit(): void {
    this.accountService.authenticate(isAuthenticated => {
      if (isAuthenticated) {
        this.listingService.getListings().subscribe(res => {
          this.listings = res;
        });

      } else {
        this.router.navigate(['']);
      }
    });
  }
}
