import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ListingService} from '../../services/listing.service';
import {Router} from '@angular/router';
import {AccountService} from '../../services/account.service';
import {ModalContentComponent} from '../modal-content/modal-content.component';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateListingComponent implements OnInit {
  private name: string;
  private price: number;
  private description: string;
  private imageUrl: string;

  private submitDisabled: boolean;

  constructor(private router: Router, private accountService: AccountService,
              private listingService: ListingService, private modalService: NgbModal) {}

  ngOnInit() {
    this.accountService.authenticate(isAuthenticated => {
      if (!isAuthenticated) {
        this.router.navigate(['']);
      }
    });
  }


  private createListing(): void {
    this.listingService.createListing(this.name, this.price, this.description, this.imageUrl, msg => {
      const content: NgbModalRef = this.modalService.open(ModalContentComponent);

      if (msg.successful) {
        content.componentInstance.title = 'Created listing:' + this.name;
      } else {
        content.componentInstance.title = 'Failed to create listing' + this.name;
      }
      content.componentInstance.message = msg.text;

      content.result.then(value => {
        this.submitDisabled = false;
      }, reason => {
        this.submitDisabled = false;
      });
    });
  }

}
