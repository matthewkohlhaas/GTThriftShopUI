import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-account-recovery-page',
  templateUrl: './verification-page.component.html',
  styleUrls: ['./verification-page.component.css']
})
export class VerificationPageComponent implements OnInit {

  private header: string;
  private message: string;

  constructor(private accountService: AccountService, private activatedRoute: ActivatedRoute) {}

  public ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.accountService.verify(params['token'], msg => {
        this.message = msg.text;
        if (msg.successful) {
          this.header = 'Verification Succeeded!';
        } else {
          this.header = 'Verification Failed';
        }
      });
    });
  }
}
