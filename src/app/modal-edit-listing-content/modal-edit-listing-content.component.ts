import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {ListingService} from '../../services/listing.service';
import {ActivatedRoute} from '@angular/router';
import {Listing} from '../../model/listing';
import {ValidationUtils} from '../../utils/validation.utils';
import {ModalService} from '../../services/modal.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModalAlertContentComponent} from '../modal-alert-content/modal-alert-content.component';
import {ConstantUtils} from '../../utils/constant.utils';

@Component({
  selector: 'app-modal-edit-listing-content',
  templateUrl: './modal-edit-listing-content.component.html',
  styleUrls: ['./modal-edit-listing-content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalEditListingContentComponent implements OnInit {

  private categoryObjects = ConstantUtils.CATEGORY_OBJECTS.slice(1);
  private category: string;

  private submitDisabled: boolean;

  private listing: Listing;

  private isChecked = false;

  constructor(
    private listingService: ListingService,
    private modalService: ModalService,
    public dialogRef: MatDialogRef<ModalAlertContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.listing = this.data.listing;
    this.category = this.listing.category;
    this.isChecked = !this.listing.isOpen;
  }

  private close(): void {
    this.dialogRef.close();
  }

  private onSubmit(): void {
    if (!this.listing || !ValidationUtils.validateNotEmpty(this.listing.name)) {
      return;
    }
    if (this.category) {
      this.listing.category = this.category;
    }

    this.listing.isOpen = this.isChecked;
    this.submitDisabled = true;
    this.listingService.editListing(this.listing, msg => {
      let title = 'Failed to Edit Listing';

      if (msg.successful) {
        title = 'Successfully Edited Listing';
        this.close();
      }
      this.modalService.openAlertModal(title, msg.text, () => this.submitDisabled = false);
    });
  }
}
