import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'sxp-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent {

  message: any;

  constructor(
    // private dialogRef: MatDialogRef<MessageModalComponent>,
    // private sanitizer: DomSanitizer,
    // @Inject(MAT_DIALOG_DATA) data
    ) {
    // this.message = data !== null && data !== '' ? this.sanitizer.bypassSecurityTrustHtml(data) : 'Something went wrong.!';
  }

  /* Public Methods */
  // onOk(): void {
  //   this.dialogRef.close();
  // }
}
