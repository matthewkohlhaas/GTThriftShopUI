import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css']
})
export class ModalContentComponent {

  @Input() title;
  @Input() message;

  constructor(public activeModal: NgbActiveModal, private router: Router) {}

  goToHome() {
    this.activeModal.dismiss();
    this.router.navigate(['']);
  }

}
