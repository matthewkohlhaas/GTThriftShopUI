import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-listing-question',
  templateUrl: './listing-question.component.html',
  styleUrls: ['./listing-question.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListingQuestionComponent implements OnInit {

  @Input() question;

  constructor() { }

  ngOnInit() {
  }

}
