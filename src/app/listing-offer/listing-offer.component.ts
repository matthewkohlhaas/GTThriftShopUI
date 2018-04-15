import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Offer} from '../../model/offer';

@Component({
  selector: 'app-listing-offer',
  templateUrl: './listing-offer.component.html',
  styleUrls: ['./listing-offer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListingOfferComponent {

  @Input() listingOwner;
  @Input() offer: Offer;

  constructor() { }

}
