import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-modal-alert-content',
  templateUrl: './modal-alert-content.component.html',
  styleUrls: ['./modal-alert-content.component.css']
})
export class ModalAlertContentComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalAlertContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onOkClicked(): void {
    this.dialogRef.close();
  }
}
