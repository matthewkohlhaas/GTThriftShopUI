import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ListingService} from '../../services/listing.service';
import {ValidationUtils} from '../../utils/validation.utils';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateListingComponent {
  private name: string;
  private price: number;
  private description: string;
  private imageUrl: string;
  private submitDisabled: boolean;
  private imageUp = false;
  private selectedFile: File;


  constructor(private listingService: ListingService,
              private modalService: ModalService) {}

  private onSubmit(): void {
    if (!ValidationUtils.validateNotEmpty(this.name)) {
      return;
    }
    this.submitDisabled = true;
    this.listingService.uploadImage(this.selectedFile, msg => {
      console.log('done');
    });
    this.listingService.createListing(this.name, this.price, this.description, this.imageUrl,
        msg => {
      let title = 'Failed to Create Listing';

      if (msg.successful) {
        title = 'Created Listing!';
      }
      this.modalService.openAlertModal(title, msg.text, () => this.resetForm());
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.imageUp = true;
  }

  private resetForm() {
    this.submitDisabled = false;
    this.name = '';
    this.price = 0;
    this.description = '';
    this.imageUrl = '';
  }

}
