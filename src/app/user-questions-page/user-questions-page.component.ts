import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {QuestionService} from '../../services/question.service';
import {ListingService} from '../../services/listing.service';
import {AccountService} from '../../services/account.service';
import {User} from '../../model/user';
import {Question} from '../../model/question';

@Component({
  selector: 'app-user-questions-page',
  templateUrl: './user-questions-page.component.html',
  styleUrls: ['./user-questions-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserQuestionsPageComponent implements OnInit {

  user: User;
  userQuestions: Question[];
  userListingQuestions: Question[];

  constructor(
    private modalService: ModalService,
    private questionService: QuestionService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe(user => {
      this.user = user;
      if (user) {
        this.userQuestions = [];
        for (const id of user.questions) {
          this.questionService.getQuestion(id.toString()).subscribe(question => this.userQuestions.push(question));
        }
        this.userListingQuestions = [];
        for (const listing of user.listings) {
          for (const id of listing.questions) {
            this.questionService.getQuestion(id.toString()).subscribe(
              question => this.userListingQuestions.push(question)
            );
          }
        }
      }
    });
  }
}
