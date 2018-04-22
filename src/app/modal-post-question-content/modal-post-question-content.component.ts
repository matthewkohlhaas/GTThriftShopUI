import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModalService} from '../../services/modal.service';
import {ListingService} from '../../services/listing.service';
import {Listing} from '../../model/listing';
import {ModalAlertContentComponent} from '../modal-alert-content/modal-alert-content.component';

@Component({
  selector: 'app-modal-post-question-content',
  templateUrl: './modal-post-question-content.component.html',
  styleUrls: ['./modal-post-question-content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalPostQuestionContentComponent implements OnInit {

  private submitDisabled = false;

  private listing: Listing;
  private question: string;

  constructor(
    private listingService: ListingService,
    private modalService: ModalService,
    public dialogRef: MatDialogRef<ModalAlertContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.listing = this.data.listing;
  }

  private close(): void {
    this.dialogRef.close();
  }

  private onSubmit(): void {
    if (!this.listing || !this.question) {
      return;
    }
    this.submitDisabled = true;
    this.listingService.postQuestion(this.listing._id, this.question, msg => {
      let title = 'Failed to Ask Question';

      if (msg.successful) {
        title = 'Successfully Asked Question';
        this.close();
      }
      this.modalService.openAlertModal(title, msg.text, () => this.submitDisabled = false);
    });
  }
}
