import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ValidationUtils} from '../../utils/validation.utils';
import {QuestionService} from '../../services/question.service';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-listing-question',
  templateUrl: './listing-question.component.html',
  styleUrls: ['./listing-question.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListingQuestionComponent {

  @Input() question;

  submitDisabled = false;
  answer: string;

  constructor(private questionService: QuestionService, private modalService: ModalService) { }

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
