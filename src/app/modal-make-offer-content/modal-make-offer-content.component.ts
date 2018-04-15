import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {Listing} from '../../model/listing';
import {ListingService} from '../../services/listing.service';
import {ModalService} from '../../services/modal.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModalAlertContentComponent} from '../modal-alert-content/modal-alert-content.component';

@Component({
  selector: 'app-modal-make-offer-content',
  templateUrl: './modal-make-offer-content.component.html',
  styleUrls: ['./modal-make-offer-content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalMakeOfferContentComponent implements OnInit {

  private submitDisabled = false;

  private listing: Listing;
  private price: number;
  private message: string;

  constructor(
    private listingService: ListingService,
    private modalService: ModalService,
    public dialogRef: MatDialogRef<ModalAlertContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.listing = this.data.listing;
    this.price = this.data.listing.price;
  }

  private close(): void {
    this.dialogRef.close();
  }

  private onSubmit(): void {
    if (!this.listing || !this.price) {
      return;
    }
    this.submitDisabled = true;
    this.listingService.createOffer(this.listing._id, this.price, this.message, msg => {
      let title = 'Failed to Make an Offer';

      if (msg.successful) {
        title = 'Successfully Made Offer';
        this.close();
      }
      this.modalService.openAlertModal(title, msg.text, () => this.submitDisabled = false);
    });
  }
}
