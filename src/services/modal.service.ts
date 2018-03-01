import {Component, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ModalAlertContentComponent} from '../app/modal-alert-content/modal-alert-content.component';


@Injectable()
export class ModalService {

  constructor(private matModalService: MatDialog) { }

  public openAlertModal(title, message, onClose?: () => void): MatDialogRef<ModalAlertContentComponent, any> {
    const modalRef: MatDialogRef<ModalAlertContentComponent, any>
      = this.matModalService.open(ModalAlertContentComponent, {
      width: '500px',
      maxWidth: '90%',
      position: {top: '10%'},
      data: {title: title, message: message}
    });

    if (onClose) {
      modalRef.afterClosed().subscribe(onClose);
    }
    return modalRef;
  }
}
