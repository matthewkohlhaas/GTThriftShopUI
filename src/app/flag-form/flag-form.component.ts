import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-flag-form',
  templateUrl: './flag-form.component.html',
  styleUrls: ['./flag-form.component.css']
})
export class FlagFormComponent{

  private readonly REASONS: string[] = [
    'Content is inappropriate',
    'Content is spam or misleading',
    'Content is abusive',
    'Other'
  ];

  private reason: string;
  private description: string;

  constructor() { }

  public getDescription(): string {
    let description;
    if (this.reason && this.description) {
      description = `${this.reason}: ${this.description}`;
    } else if (this.reason) {
      description = this.reason;
    } else if (this.description) {
      description = this.description;
    }
    return description;
  }
}
