import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-confirm',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class GetConfirmComponent implements OnInit {
  constructor(private _MatDialogRef: MatDialogRef<GetConfirmComponent>) {}

  ngOnInit(): void {}
  onClose(flag: boolean) {
    this._MatDialogRef.close(flag);
  }
}
