import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalSigninComponent } from '../modal-signin/modal-signin.component';
import { ModalRegistrationComponent } from '../modal-registration/modal-registration.component';
import { ModalLoginCheckComponent } from '../modal-login-check/modal-login-check.component';
import { StormNewsService } from 'src/app/services/storm-news.service';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss']
})

export class EnterComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialog2: MatDialog, public dialog3: MatDialog, public stormNewsService: StormNewsService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalSigninComponent, {});
    dialogRef.afterClosed().subscribe(result => { });
  }

  openDialog2(): void {
    const dialogRef2 = this.dialog2.open(ModalRegistrationComponent);
    dialogRef2.afterClosed().subscribe(result => {
      if (result === 2) {
        this.openDialog();
        this.openDialog3();
      }
    });
  }

  openDialog3(): void {
    const dialogRef3 = this.dialog3.open(ModalLoginCheckComponent, {
      data: {
        choseTextInModalCheckComponent: 'Registration is complete!'
      }
    });
    dialogRef3.afterClosed().subscribe(result => { });
  }

  ngOnInit() { }

}
