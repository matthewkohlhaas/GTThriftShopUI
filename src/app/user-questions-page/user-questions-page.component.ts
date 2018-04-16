import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {OfferService} from '../../services/offer.service';
import {ListingService} from '../../services/listing.service';
import {AccountService} from '../../services/account.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-user-questions-page',
  templateUrl: './user-questions-page.component.html',
  styleUrls: ['./user-questions-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserQuestionsPageComponent implements OnInit {

  user: User;

  constructor(
    private modalService: ModalService,
    private listingService: ListingService,
    private offerService: OfferService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }
}
