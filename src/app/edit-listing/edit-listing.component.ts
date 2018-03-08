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

  private name: string;
  private price: number;
  private description: string;
  private imageUrl: string;

  private prevName: string;
  private prevPrice: number;
  private prevDescription: string;
  private prevImageUrl: string;

  private listingID: string;
  private listing: Listing;

  private submitDisabled: boolean;

  constructor(private listingService: ListingService, private route: ActivatedRoute,
              private modalService: ModalService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.listingID = params['listing'];
    });

    this.listingService.getListingByID(this.listingID).subscribe(res => {
      this.listing = res;
      this.prevName = this.listing.name;
      this.prevDescription = this.listing.description.substr(0, 16) + '...';
      this.prevPrice = this.listing.price;
      this.prevImageUrl = this.listing.imageUrl.substr(0, 8) + '...';
    });
  }

  private onSubmit(): void {
    if (!ValidationUtils.validateNotEmpty(this.name)) {
      return;
    }
    this.submitDisabled = true;
    this.listingService.updateListing(this.listingID, this.name, this.price, this.description, this.imageUrl, msg => {
      let title = 'Failed to edit listing';

      if (msg.successful) {
        title = 'Edited Listing!';
      }
      this.modalService.openAlertModal(title, msg.text, () => this.closeForm());
    });

  }

  private closeForm(): void {
    this.router.navigateByUrl('#');
  }

}
