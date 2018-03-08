import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Listing} from '../../model/listing';
import {ListingService} from '../../services/listing.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../model/user';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-listing-view',
  templateUrl: './listing-view.component.html',
  styleUrls: ['./listing-view.component.css'],
})
export class ListingViewComponent implements OnInit {

  listing: Listing;
  listingID: string;
  private currentUser: User;

  constructor(private listingService: ListingService, private route: ActivatedRoute,
              private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.listingID = params['listing'];
    });

    this.listingService.getListingByID(this.listingID).subscribe(res => {
      this.listing = res;
    });


  }

}
