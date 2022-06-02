import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { ConfirmModalData } from '../../models/confirm-modal-data.model';
// import { MessageModalComponent } from '../../components/message-modal/message-modal.component';
// import { ValidationSheetComponent } from '../components/validation-sheet/validation-sheet.component';
// import { ConfirmModalData } from '../models/confirm-modal-data.model';
 import { merge } from 'lodash-es';
import { MessageModalComponent } from '../../components/message-modal/message-modal.component';

@Injectable()
export class ModalService {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet
  ) { }

  /* Public Methods */
  setDialogConfig(disableClose: boolean, autoFocus: boolean, width: string, data: any = null, panelClass: string = ''): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = disableClose;
    dialogConfig.autoFocus = autoFocus;
    dialogConfig.width = width;
    dialogConfig.data = data;
    dialogConfig.panelClass = panelClass;
    return dialogConfig;
  }

  showSuccessMessage(message: string): void {
    const dialogConfig = this.setDialogConfig(true, false, 'auto', message);
    dialogConfig.panelClass = 'success';
    this.dialog.open(MessageModalComponent, dialogConfig);
  }

  // showInfoMessage(message: string): void {
  //   const dialogConfig = this.setDialogConfig(true, false, 'auto', message);
  //   dialogConfig.panelClass = 'info';
  //   this.dialog.open(MessageModalComponent, dialogConfig);
  // }

  // showAlertMessage(message: string): any {
  //   const dialogConfig = this.setDialogConfig(true, false, 'auto', message);
  //   dialogConfig.panelClass = 'alert';
  //   return this.dialog.open(MessageModalComponent, dialogConfig);
  // }

  // showErrorMessage(message: string): void {
  //   const dialogConfig = this.setDialogConfig(true, false, 'auto', JSON.stringify(message));
  //   //dialogConfig.panelClass = 'error';
  //   this.dialog.open(MessageModalComponent, dialogConfig);
  // }

  private cnfirmModalData!: ConfirmModalData;

  confirm(data: ConfirmModalData): any {
    const userConfig = merge({}, this.cnfirmModalData, data);
    const dialogConfig = this.setDialogConfig(true, false, 'auto', data);
    dialogConfig.panelClass = 'confirm';
    return this.dialog.open(ConfirmModalComponent, dialogConfig).afterClosed();
  }

  /*
  * message: message to be displayed
  * action: label of button
  */
  showNotification(message: string, action: string = 'OK', duration: number = 4000): void {
    this.snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration,
    });
  }

  // showValidationSheet(formGroup: FormGroup, validationMessages: any): void {
  //   this.bottomSheet.open(ValidationSheetComponent, {
  //     data: { formGroup, validationMessages },
  //   });
  // }
}
