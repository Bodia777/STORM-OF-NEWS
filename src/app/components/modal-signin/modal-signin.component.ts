import {
  Component,
  OnInit,
  Inject,
  OnDestroy
} from '@angular/core';
import {
  StormNewsService
} from 'src/app/services/storm-news.service';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog
} from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder
} from '@angular/forms';
import {
  ModalLoginCheckComponent
} from '../modal-login-check/modal-login-check.component';
import {Router} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-modal-signin',
  templateUrl: './modal-signin.component.html',
  styleUrls: ['./modal-signin.component.scss']
})
export class ModalSigninComponent implements OnInit, OnDestroy {
  signinForm: FormGroup;
  isLogged: boolean;
  private userResult: any;

  private unsubscribed = new Subject();

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef < ModalSigninComponent > ,
    public dialogRef2: MatDialogRef < ModalLoginCheckComponent > ,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stormNewsService: StormNewsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.createSigninForm();
  }

  ngOnDestroy(): void {
    this.unsubscribed.next();
    this.unsubscribed.complete();
}

  private createSigninForm(): void {
    this.signinForm = this.fb.group({
      loginSignin: [],
      passwordSignin: []
    });
  }
  enterToNewsPage() {
    this.stormNewsService.currentUser = [];
    this.stormNewsService.getUserArr()
    .pipe(takeUntil(this.unsubscribed))
    .subscribe(
     async (userarr) => {
        this.stormNewsService.userArr = userarr.slice();
        if (this.stormNewsService.userArr.length !== 0) {
          for (const key in this.stormNewsService.userArr) {
            // tslint:disable-next-line: max-line-length && tslint:disable-next-line: no-string-literal
            if (this.signinForm.controls['loginSignin'].value === this.stormNewsService.userArr[key].userLogin && this.signinForm.controls['passwordSignin'].value === this.stormNewsService.userArr[key].userPassword && this.signinForm.controls['passwordSignin'].value !== null && this.signinForm.controls['loginSignin'].value !== null) {
              this.signinForm.reset();
              this.stormNewsService.currentUser.push(this.stormNewsService.userArr[key]);
              this.stormNewsService.userArr[key].isLogin = true;
              this.isLogged = true;
              this.dialogRef.close();
              this.stormNewsService.logIn = 'Logout';
              this.router.navigate(['news']);
              try {
              this.userResult = await this.stormNewsService.putChangesUserArr();
              this.stormNewsService.hello = `Hello, ${this.stormNewsService.currentUser[0].userName}`;
              } catch (error) {
                console.log(error);
              }
              break;
            // tslint:disable-next-line: max-line-length
            } else if ((this.signinForm.controls.loginSignin.value !== this.stormNewsService.userArr[key].userLogin || this.signinForm.controls.passwordSignin.value !== this.stormNewsService.userArr[key].userPassword || this.signinForm.controls.passwordSignin.value === null || this.signinForm.controls.loginSignin.value === null) && this.stormNewsService.userArr.length === (+key) + 1 ) {
              this.openDialog2();
            }
          }
        } else {
          this.openDialog2();
        }
      },
      (err) => {console.log(err);
  });
  }
  openDialog2(): void {
    const dialogRef2 = this.dialog.open(ModalLoginCheckComponent, {
      data: {
        choseTextInModalCheckComponent: 'Wrong Password or Login'
      }
    });
    dialogRef2.afterClosed().subscribe(result => {});
  }
}
