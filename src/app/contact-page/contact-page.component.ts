import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactPageComponent implements OnInit {
  private submitDisabled: boolean;
  private ticketSubject: string;
  private ticketMessage: string;

  constructor(private router: Router) { }
  ngOnInit() {

  }

}
