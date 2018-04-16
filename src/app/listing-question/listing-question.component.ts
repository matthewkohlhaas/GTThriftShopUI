import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ValidationUtils} from '../../utils/validation.utils';
import {QuestionService} from '../../services/question.service';
import {ModalService} from '../../services/modal.service';
import {AccountService} from '../../services/account.service';
import {Question} from '../../model/question';
import {Listing} from '../../model/listing';

@Component({
  selector: 'app-listing-question',
  templateUrl: './listing-question.component.html',
  styleUrls: ['./listing-question.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListingQuestionComponent implements OnInit {

  @Input() question: Question;
  @Input() listing: Listing;

  currUserId: string;
  submitDisabled = false;
  answer: string;

  constructor(
    private questionService: QuestionService,
    private accountService: AccountService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.currUserId = this.accountService.getCurrentUserFromToken()._id;
  }

  onSubmitAnswer(): void {
    if (this.submitDisabled || !ValidationUtils.validateNotEmpty(this.answer)) {
      return;
    }
    this.submitDisabled = true;
    this.questionService.putAnswer(this.question._id, this.answer)
      .then(msg => {
        this.question.answer = this.answer;
        this.resetForm();
      })
      .catch(msg => {
        this.modalService.openAlertModal('Failed to Answer Question', msg, () => this.resetForm());
      });
  }

  private resetForm(): void {
    this.answer = '';
    this.submitDisabled = false;
  }
}
