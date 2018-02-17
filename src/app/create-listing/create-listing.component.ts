import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ListingService} from '../../services/listing.service';
import {ModalContentComponent} from '../modal-content/modal-content.component';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';


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

  constructor(private listingService: ListingService,
              private modalService: NgbModal) {}

  private onSubmit(): void {
    this.submitDisabled = true;
    this.listingService.createListing(this.name, this.price, this.description, this.imageUrl, msg => {
      const content: NgbModalRef = this.modalService.open(ModalContentComponent);

      if (msg.successful) {
        content.componentInstance.title = 'Created Listing!';
      } else {
        content.componentInstance.title = 'Failed to Create Listing';
      }
      content.componentInstance.message = msg.text;

      content.result.then(value => {
        this.resetForm();
      }, reason => {
        this.resetForm();
      });
    });
  }

  private resetForm() {
    this.submitDisabled = false;
    this.name = '';
    this.price = 0;
    this.description = '';
    this.imageUrl = '';
  }

}
