import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-login-check',
  templateUrl: './modal-login-check.component.html',
  styleUrls: ['./modal-login-check.component.scss']
})
export class ModalLoginCheckComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalLoginCheckComponent>,
              @Inject (MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

}
