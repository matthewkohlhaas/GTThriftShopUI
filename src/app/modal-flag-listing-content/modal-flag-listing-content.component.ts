import {Component, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FlagService} from '../../services/flag.service';
import {ModalService} from '../../services/modal.service';
import {Listing} from '../../model/listing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModalAlertContentComponent} from '../modal-alert-content/modal-alert-content.component';

@Component({
  selector: 'app-flag-listing-content',
  templateUrl: './modal-flag-listing-content.component.html',
  styleUrls: ['./modal-flag-listing-content.component.css']
})
export class ModalFlagListingContentComponent {

  private submitDisabled = false;

  constructor(
    private modalService: ModalService,
    private flagService: FlagService,
    public dialogRef: MatDialogRef<ModalAlertContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  private onCancel(): void {
    this.dialogRef.close();
  }

  private onSubmit(description: string): void {
    if (!this.data || !this.data.listing) {
      return;
    }
    this.submitDisabled = true;

    this.flagService.flagListing(this.data.listing, description, msg => {
      let title = 'Failed to flag listing';
      if (msg.successful) {
        title = 'Successfully flagged listing';
        this.dialogRef.close();
      }
      this.modalService.openAlertModal(title, msg.text, () => this.submitDisabled = false);
    });
  }
}
