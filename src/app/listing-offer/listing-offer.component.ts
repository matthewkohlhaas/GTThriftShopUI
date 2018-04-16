import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Offer} from '../../model/offer';
import {OfferService} from '../../services/offer.service';
import {ModalService} from '../../services/modal.service';
import {ValidationUtils} from '../../utils/validation.utils';

@Component({
  selector: 'app-listing-offer',
  templateUrl: './listing-offer.component.html',
  styleUrls: ['./listing-offer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListingOfferComponent {

  @Input() offer: Offer;
  @Input() listing;
  @Input() showUser = false;
  @Input() showListing = false;

  @Output() postMessage: EventEmitter<any> = new EventEmitter();

  submitDisabled = false;
  message: string;

  constructor(private offerService: OfferService, private modalService: ModalService) { }

  onSubmit(): void {
    if (this.submitDisabled || !ValidationUtils.validateNotEmpty(this.message)) {
      return;
    }
    this.submitDisabled = true;
    this.offerService.postMessage(this.offer._id, this.message, msg => {
      if (!msg.successful) {
        this.modalService.openAlertModal('Failed to post message', msg.text, () => this.resetForm());
      } else {
        this.postMessage.emit();
        this.resetForm();
      }
    });
  }

  private resetForm(): void {
    this.message = '';
    this.submitDisabled = false;
  }
}
