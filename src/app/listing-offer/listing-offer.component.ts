import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Offer} from '../../model/offer';
import {OfferService} from '../../services/offer.service';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-listing-offer',
  templateUrl: './listing-offer.component.html',
  styleUrls: ['./listing-offer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListingOfferComponent {

  @Input() listingOwner;
  @Input() offer: Offer;

  @Output() postMessage: EventEmitter<any> = new EventEmitter();

  submitDisabled = false;
  message: string;

  constructor(private offerService: OfferService, private modalService: ModalService) { }

  onSubmit(): void {
    this.submitDisabled = true;
    this.offerService.postMessage(this.offer._id, this.message, msg => {
      if (!msg.successful) {
        this.modalService.openAlertModal('Failed to post message', '',
          () => this.submitDisabled = false);
      } else {
        this.postMessage.emit();
        this.submitDisabled = false;
      }
    });
  }
}
