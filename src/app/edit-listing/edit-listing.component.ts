import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ListingService} from '../../services/listing.service';
import {ActivatedRoute} from '@angular/router';
import {Listing} from '../../model/listing';
import {ValidationUtils} from '../../utils/validation.utils';
import {ModalService} from '../../services/modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditListingComponent implements OnInit {

  private listing: Listing;
  private submitDisabled: boolean;

  constructor(
    private listingService: ListingService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.listing = new Listing();
    this.route.queryParams.subscribe(params => {
      this.listingService.getListingByID(params['listing']).subscribe(value => {
        this.listing = value;
      });
    });
  }

  private onSubmit(): void {
    if (!ValidationUtils.validateNotEmpty(this.listing.name)) {
      return;
    }
    this.submitDisabled = true;
    this.listingService.updateListing(this.listing, msg => {
      let title = 'Failed to edit listing';

      if (msg.successful) {
        title = 'Edited Listing!';
      }
      this.modalService.openAlertModal(title, msg.text, () => this.closeForm());
    });
  }

  private closeForm(): void {
    this.router.navigateByUrl('/listings');
  }
}
