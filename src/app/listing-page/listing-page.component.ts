import {Component, OnInit} from '@angular/core';
import {Listing} from '../../model/listing';
import {ListingService} from '../../services/listing.service';
import {NgbModalRef, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FlagComponent} from "../flag/flag.component";
import {FlagService} from "../../services/flag.service";

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent implements OnInit {
  listings: Listing[];

  constructor(private listingService: ListingService, private modalService: NgbModal, private flagService: FlagService ) {}

  ngOnInit(): void {
    this.listingService.getListings().subscribe(res => {
      this.listings = res;
    });
  }

  private flagOnClick(listing): void {
    this.flagService.setListing(listing);
    const content: NgbModalRef = this.modalService.open(FlagComponent);
  }


}
