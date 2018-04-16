import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Offer} from '../../model/offer';
import {OfferService} from '../../services/offer.service';
import {ModalService} from '../../services/modal.service';
import {ValidationUtils} from '../../utils/validation.utils';
import {Listing} from '../../model/listing';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-listing-offer',
  templateUrl: './listing-offer.component.html',
  styleUrls: ['./listing-offer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListingOfferComponent implements OnInit {

  @Input() offer: Offer;
  @Input() listing: Listing;
  @Input() showUser = false;
  @Input() showListing = false;

  @Output() postMessage: EventEmitter<any> = new EventEmitter();

  currUserId: string;
  submitDisabled = false;
  message: string;

  constructor(
    private offerService: OfferService,
    private accountService: AccountService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.currUserId = this.accountService.getCurrentUserFromToken()._id;
  }

  onSubmitMessage(): void {
    if (this.submitDisabled || !ValidationUtils.validateNotEmpty(this.message)) {
      return;
    }
    this.submitDisabled = true;
    this.offerService.postMessage(this.offer._id, this.message)
      .then(msg => {
        this.postMessage.emit();
        this.resetForm();
      })
      .catch(msg => {
        this.modalService.openAlertModal('Failed to Post Message', msg, () => this.resetForm());
      });
  }

  private resetForm(): void {
    this.message = '';
    this.submitDisabled = false;
  }

  toggleAccepted(): void {
    if (this.submitDisabled) {
      return;
    }
    this.submitDisabled = true;
    this.offerService.putAccepted(this.offer._id, !this.offer.accepted)
      .then(msg => {
        this.offer.accepted = !this.offer.accepted;
        if (this.offer.accepted) {
          this.offer.rejected = false;
        }
        this.submitDisabled = false;
      })
      .catch(msg => {
        this.modalService.openAlertModal('Failed to Update Accepted Status', msg,
          () => this.submitDisabled = false);
      });
  }

  toggleRejected(): void {
    if (this.submitDisabled) {
      return;
    }
    this.submitDisabled = true;
    this.offerService.putRejected(this.offer._id, !this.offer.rejected)
      .then(msg => {
        this.offer.rejected = !this.offer.rejected;
        if (this.offer.rejected) {
          this.offer.accepted = false;
        }
        this.submitDisabled = false;
      })
      .catch(msg => {
        this.modalService.openAlertModal('Failed to Update Rejected Status', msg,
          () => this.submitDisabled = false);
      });
  }
}
