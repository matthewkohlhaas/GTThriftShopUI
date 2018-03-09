import {Component, Injectable, TemplateRef} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ModalAlertContentComponent} from '../app/modal-alert-content/modal-alert-content.component';
import {ComponentType} from '@angular/cdk/portal';
import {ModalFlagListingContentComponent} from '../app/modal-flag-listing-content/modal-flag-listing-content.component';
import {Listing} from '../model/listing';

@Injectable()
export class ModalService {

  private modalStack: MatDialogRef<any, any>[];

  constructor(private matModalService: MatDialog) {
    this.modalStack = [];
  }

  public openModal<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, data?: any,
                      onClose?: () => void): MatDialogRef<T, any> {

    const modalRef: MatDialogRef<T, any>
      = this.matModalService.open<T>(componentOrTemplateRef, {
      width: '90%',
      maxWidth: '500px',
      data: data ? data : {}
    });

    if (onClose) {
      modalRef.afterClosed().subscribe(() => {
        this.modalStack.pop();
        onClose();
      });
    }
    this.modalStack.push(modalRef);
    return modalRef;
  }

  public openAlertModal(title: string, message: string,
                        onClose?: () => void): MatDialogRef<ModalAlertContentComponent, any> {

    return this.openModal(ModalAlertContentComponent, {title: title, message: message}, onClose);
  }

  public modelIsOpened(): boolean {
    return this.modalStack.length > 0;
  }

  public getTopModal(): MatDialogRef<any, any> {
    if (this.modelIsOpened()) {
      return this.modalStack[this.modalStack.length - 1];
    }
    return null;
  }

  public closeTopModal(): void {
    this.getTopModal().close();
  }
}
